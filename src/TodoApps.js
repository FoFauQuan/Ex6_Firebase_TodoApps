import { useEffect, useState } from "react"
import { FlatList, Text, View } from "react-native"
import { Appbar, Button, List,TextInput } from "react-native-paper"
import firestore from"@react-native-firebase/firestore"


const ToDoApps =({navigation})=>{
    const ref = firestore().collection('todos');
    const [newToDo,setNewToDo]=useState("")
    const [loading,setLoading] =useState(true);
    const [error,setError] = useState(false)
    const [todos,setToDo]=useState([])
    
    useEffect(() => {
        const unsubscribe = ref.onSnapshot(collection => {
            const result = [];
            collection.forEach(doc => {
                const { title, complete } = doc.data();
                result.push({
                    id: doc.id,
                    title,
                    complete
                });
            });
            // Đặt setToDo bên trong callback của onSnapshot
            setToDo(result);
        });
        
        // Trả về một hàm để unsubscribe khi không cần thiết nữa
        return () => unsubscribe();
    }, [todos]);


    const addNewTodo=()=>{
        ref.add(
            {
                title: newToDo,
                complete: false
            }
        )
        .then(()=>console.log("Add new to do "))
        .catch(e=>console.log(e.message))

    }
    const toggleComplete=(id,complete)=>{
        ref.doc(id)
        .update({
            complete: !complete,
        });
    }
    const renderItem =({item})=>{
        const {id,title,complete} = item
        return(
            <List.Item
                style = {{
                    padding:10
                }} 
                title={<Text style={{ fontWeight: 'bold', fontSize: 25 }}>{title}</Text>}
                onPress={()=>toggleComplete(id,complete)}
                left={props =>(
                    <List.Icon {...props} icon={complete ? 'checkbox-outline' :'checkbox-blank-outline'}/>
                )}
                right={() => (
                    <Button icon="delete" color="#f00" onPress={() => deleteTodo(id)}>
                      Delete
                    </Button>
                )}              
            />
        )
    }
    const deleteTodo = (id) => {
        ref.doc(id)
          .delete()
          .then(() => {
            console.log("Todo deleted successfully");
          })
          .catch((error) => {
            console.error("Error removing todo: ", error);
          });
      };

    return(
        <View style={{flex:1,backgroundColor:'#987654'}}>
            <Appbar style={{backgroundColor:'#9876'}}>
                <Appbar.Content title="To Do List"/>
                <Appbar.Action icon='logout' size={30} onPress={() => navigation.navigate("Login")} />
            </Appbar>
            <FlatList
                style={{
                    flex:1,
                    backgroundColor:'#D1B9A2',
                    marginHorizontal:10,
                    borderRadius:20
                }}
                data = {todos}
                keyExtractor={item =>item.id}
                renderItem={renderItem}
            />
            {/* <ScrollView style={{flex:1}}>
            </ScrollView> */}
            <TextInput
            style = {{
                margin:10,
                backgroundColor:'#DDCAB8',
                borderRadius:10
            }} 
            label={'New Todo'}
            value={newToDo}
            onChangeText={setNewToDo}
            >
            </TextInput>

            <Button
            style={{
                height:50,
                width:'auto',
                backgroundColor:'#D1B9A2',
                justifyContent:"flex-end",
            }} 
            onPress={addNewTodo}>
                <Text
                style={{
                    flexGrow:1,
                    fontSize:22,
                    color:"black"
                }} 
                >Add New Todo</Text>
            </Button>
        </View>
    )
}
export default ToDoApps;