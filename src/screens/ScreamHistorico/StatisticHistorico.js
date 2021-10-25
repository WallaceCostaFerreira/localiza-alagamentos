import React from 'react'
import{
    StyleSheet,
    View,
    Text,
    FlatList
} from 'react-native'

import theme from "../../constants/theme";
import Principal from '../Principal';
import { Component } from 'react/cjs/react.production.min';


export default class StatisticHistorico extends Component{
    constructor(props){
        super(props);
        this.state = {
            reportes: [
                {
                    data: '24/10/2021',
                    hora: '19:17',
                    temperatura: 13,
                    tempo: 'ps',
                    nivel: 'Alto',
                    ocorrencias:8
                },
                {
                    data: '25/10/2021',
                    hora: '19:17',
                    temperatura: 13,
                    tempo: 'ps',
                    nivel: 'Baixo',
                    ocorrencias:5
                },
                {
                    data: '26/10/2021',
                    hora: '19:17',
                    temperatura: 13,
                    tempo: 'ps',
                    nivel: 'Baixo',
                    ocorrencias:8
                    
                }
            ]
        }
    }

render(){
    return(
        
       <View style={styles.container}>
           <Text style={styles.title}>Dados Estatísticos </Text>
           <FlatList
               data={this.state.reportes}
               renderItem={({item}) =>
               < View  style={styles.containerReport} >
                   <Text style={styles.info}> Data: {item.data}    Hora: {item.hora} </Text>
                   <Text style={styles.info}> Temperatura: {item.temperatura}º   Tempo: {item.tempo}  </Text>
                   <Text style={styles.info}> Nível: {item.nivel}  Tempo: {item.tempo}  </Text>
                   <Text style={styles.info}> Ocorrências: {item.ocorrencias} </Text>
               </View>
               }
           />
       </View> 
       
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title:{
        color: theme.colors.primary,
        fontSize: 25,
        marginTop: 45,
        left: 110,
       fontWeight: 'bold',
    },
    containerReport:{
        backgroundColor: theme.colors.primary,
        height: 80,
        margin:10,
        justifyContent: 'center',
        alignItems: 'center',
        color:'white',
        borderRadius:10,
        shadowColor:'#000000',
        shadowOffset:{width:0, height:4},
        shadowOpacity: .3,
        shadowRadius: 20,


    },
    info:{
        color: 'white',
        fontWeight: 'bold',

    }
})


