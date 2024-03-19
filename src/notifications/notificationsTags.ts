import { OneSignal } from 'react-native-onesignal';


export function tagUserInfoCreate() {
    OneSignal.User.addTags({
        user_name: "Assis",
        user_email: "assis@mail.com",
        
    });
}

export function tagUserEmailRemove( email: string) {
    OneSignal.User.removeTag("user_email");
}