import { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { NotificationClickEvent, OneSignal } from 'react-native-onesignal';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';

const oneSignalAppId = Platform.OS === 'ios'
     ? "" 
     : "f1571180-5a0c-48ad-95d3-788a32be45cb";

OneSignal.initialize(oneSignalAppId);
OneSignal.Notifications.requestPermission(true);

export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();


  useEffect(() => {

    const handleNotificationClick = (event: NotificationClickEvent): void => {
      
      const { actionId } = event.result;

      switch (actionId) {

        case '1':
          console.log('Ver Todos os produtos!');
          break;
        case '2':
          console.log('Ver o produto específico!');
          break;
        default:
          console.log('Nenhum botão de ação foi clicado!');
          break;

      }


    };

    OneSignal.Notifications.addEventListener("click", handleNotificationClick);

    return () => OneSignal.Notifications.removeEventListener("click", handleNotificationClick);

  }, []);


  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}