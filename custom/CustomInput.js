import { StyleSheet, View } from "react-native"
import { TextInput } from "react-native-paper"



const CustomInput=({value,setValue,placeholder,secureTextEntry})=>{
    return(
        <View style ={myStyle.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={myStyle.input}
                secureTextEntry={secureTextEntry}
                />
        </View>
    )
}
export default CustomInput;

const myStyle = StyleSheet.create({
    container:{
        backgroundColor:"white",
        width:'100%',

        borderColor:'#e8e8e8',
        borderWidth:1,
        borderRadius:5,

        paddingHorizontal:10,
        marginVertical:5,
    },
    input:{

    }
})