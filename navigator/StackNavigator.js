import { createStackNavigator } from "@react-navigation/stack";
import Login from "../src/Login";
import ToDoApps from "../src/TodoApps";
import Register from "../src/Register";



const Stack = createStackNavigator()
const StackNavigator =()=>{
    return(
        <Stack.Navigator
        backBehavior="order">
            <Stack.Screen name ="Login" component={Login}
            options={{headerShown :false}}
            />
            <Stack.Screen name ="Register" component={Register}/>
            <Stack.Screen name ="ToDoApps" component={ToDoApps}
            options={{headerShown :false}}/>
        </Stack.Navigator>
    )
}
export default StackNavigator;