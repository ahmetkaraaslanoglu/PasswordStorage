import CryptoJS from 'react-native-crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function encryptData(data,key){
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}
export const decryptData = (textToDecrypt) => {
    try {
        const bytes  = CryptoJS.AES.decrypt(textToDecrypt, 'fhC67');
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    } catch (error) {
        console.error('An error occurred during decryption: ', error);
    }
};

export async function deleteAccount(id) {
    try {
        const storedAccounts = await AsyncStorage.getItem('accounts');
        if (storedAccounts) {
            const accounts = JSON.parse(storedAccounts);
            const updatedAccounts = accounts.filter(account => account.id !== id);
            await AsyncStorage.setItem('accounts', JSON.stringify(updatedAccounts));
            console.log('Account deleted. Current accounts: ', updatedAccounts);
        }
    } catch (error) {
        console.log('Error deleting account: ', error);
    }
}


