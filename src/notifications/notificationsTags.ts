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

export function tagCartUpdate(itemsCount: string) {
    OneSignal.User.addTag("cart_items_count", itemsCount);
}