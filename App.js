import"react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native"
import { PaperProvider } from "react-native-paper";
import StackNavigator from "./navigator/StackNavigator";
import Login from "./src/Login";

const App =()=>{
  return(
    <NavigationContainer>
      <PaperProvider>

        <StackNavigator/>

      </PaperProvider>
    </NavigationContainer>
  )
}
export default App;