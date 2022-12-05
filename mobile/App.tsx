import { NativeBaseProvider, StatusBar} from "native-base";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Pools } from './src/screens/Pools';
import { SignIn } from './src/screens/SignIn';
import { New } from "./src/screens/New";
import { Loading } from './src/components/Loading';

import { THEME } from './src/styles/theme';
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { Routes } from "./src/routes";


export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold})

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
      <Barra/>
      { fontsLoaded ? <Routes/> : <Loading/> }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

const Barra = () => {
  return (
    <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent></StatusBar>
  );
}
