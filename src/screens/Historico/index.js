import React from 'react'
import{
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator, 
    ToastAndroid
} from 'react-native'

import { Modalize } from 'react-native-modalize';
import theme from "../../constants/theme";
import { Component } from 'react/cjs/react.production.min';
import api from '../Principal/api';

import imgBaixo from '../../assets/images/baixo.png';
import imgMedio from '../../assets/images/medio.png';
import imgAlto from '../../assets/images/alto.png';

import {
    TitleText,
    SubtitleText,
    ImageLevel,
    MinimalText
} from '../Principal/styles'

import {
    Col,
    Row,
    DescText
} from './styles'

export default class Historico extends Component{
    constructor(props){
        super(props);
        this.state = {
            reportes: [],
            datas: [],
            qtdBaixo: 0,
            qtdMedio: 0,
            qtdAlto: 0,
            dataAtual: '',
            outrosDadosAPI: []
        }
    }

    modalizeDadosData = React.createRef();

    //Puxa datas ao montar a tela.
    componentDidMount = () => {
        api.get('/puxa_datas.php').then(response => {
            if(response.status >= 200 && response.status <= 300){
                response.data.forEach(element => {
                    this.setState(prevState => ({
                        datas: [...prevState.datas, element.dataAtualizacao.split(" ")[0]]
                    }))
                });
            }else{
                ToastAndroid.show("Tente novamente mais tarde!",ToastAndroid.SHORT);
            }
        }).catch((error) => {
            console.log('Error ao salvar puxar datas '+error)
        })
    }

    //Traz apenas valores diferentes para nao repetir datas
    unique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    //Pega dados da API
    chamaDados = async (data) =>{
        this.setState({
            dataAtual: data.replace('-','/').replace('-','/'),
            qtdBaixo: 0,
            qtdMedio: 0,
            qtdAlto: 0
        });

        
        api.get(`contagem_por_nivel.php?dataAtualizacao=${data}`).then(response => {
            if(response.status >= 200 && response.status <= 300){
                this.separaDados(response.data, data);
            }else{
                ToastAndroid.show("Tente novamente mais tarde!",ToastAndroid.SHORT);
            }
        }).catch((error) => {
            console.log('Erro ao trazer dados por datas '+error)
        })
    }

    pegaOutrosDados = (data) =>{

        api.get(`pegando_info.php?dataAtualizacao=${data}`).then(responseOutros => {
            if(responseOutros.status >= 200 && responseOutros.status <= 300){
                this.setState({outrosDadosAPI: responseOutros.data})
            }else{
                ToastAndroid.show("Tente novamente mais tarde!",ToastAndroid.SHORT);
            }
        }).catch((error) => {
            console.log('Erro ao trazer alguns dados '+error)
        });

    }


    separaDados = (dados, data) => {


        dados.forEach(element => {
            console.log("separaDados ",element);
            if(element.nivel == "baixo"){
                this.setState({qtdBaixo: element.qtd})
            }else if(element.nivel == "medio"){
                this.setState({qtdMedio: element.qtd})
            }else{
                this.setState({qtdAlto: element.qtd})
            }
        })

        this.pegaOutrosDados(data)

        this.modalizeDadosData.current?.open();
    }

    render(){
        return(
            
            <View style={styles.container}>
                {this.state.datas != null ? 
                    this.state.datas.filter(this.unique).map((dado ,index) => (
                        <TouchableOpacity 
                            key={index}
                            onPress={() => this.chamaDados(dado.split("-")[2]+"-"+dado.split("-")[1]+"-"+dado.split("-")[0])}
                            style={styles.containerReport} >
                            <Text style={styles.info}> {dado.split("-")[2]+"/"+dado.split("-")[1]+"/"+dado.split("-")[0]} </Text>
                        </TouchableOpacity>
                    ))
                :
                    <ActivityIndicator style={{top:'45%'}} size="large" color={theme.colors.primary}/>
                }
                {/* <FlatList
                    data={this.state.reportes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) =>
                        <View 
                            style={styles.containerReport} >
                            <Text style={styles.info}> Data: {item.data}    Hora: {item.hora} </Text>
                            <Text style={styles.info}> Temperatura: {item.temperatura}º   Tempo: {item.tempo}  </Text>
                            <Text style={styles.info}> Nível: {item.nivel}  Tempo: {item.tempo}  </Text>
                            <Text style={styles.info}> Ocorrências: {item.ocorrencias} </Text>
                        </View>
                    }
                /> */}
                <Modalize
                    ref={this.modalizeDadosData}
                    scrollViewProps={{ showsVerticalScrollIndicator: false }}
                    snapPoint={370}
                    modalHeight={370}
                    handleStyle={{
                        backgroundColor:theme.colors.primaryDark,
                        marginTop:20
                    }}
                >
                    <TitleText>Dados de {this.state.dataAtual}</TitleText>
                    <SubtitleText>Níveis de Água relatados</SubtitleText>

                    <Row>
                        <Col>
                            <ImageLevel source={imgBaixo} />
                            <DescText>{this.state.qtdBaixo}</DescText>
                        </Col>
                        <Col>
                            <ImageLevel source={imgMedio} />
                            <DescText>{this.state.qtdMedio}</DescText>
                        </Col>
                        <Col>
                            <ImageLevel source={imgAlto} />
                            <DescText>{this.state.qtdAlto}</DescText>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MinimalText style={{fontSize: 14,}}>Horário</MinimalText>
                        </Col>
                        <Col>
                            <MinimalText style={{fontSize: 14,}}>Pressão</MinimalText>
                        </Col>
                        <Col>
                            <MinimalText style={{fontSize: 14,}}>Temp</MinimalText>
                        </Col>
                        <Col>
                            <MinimalText style={{fontSize: 14,}}>Tempo</MinimalText>
                        </Col>
                        <Col>
                            <MinimalText style={{fontSize: 14,}}>Umidade</MinimalText>
                        </Col>
                    </Row>
                    
                    {this.state.outrosDadosAPI.map((item,index)=>(
                        <Row key={index}>
                            <Col>
                                <MinimalText>{item.dataAtualizacao.split(" ")[1]}</MinimalText>
                            </Col>
                            <Col>
                                <MinimalText>{item.pressao}</MinimalText>
                            </Col>
                            <Col>
                                <MinimalText>{item.temperatura} °C</MinimalText>
                            </Col>
                            <Col>
                                <MinimalText>{item.tempo}</MinimalText>
                            </Col>
                            <Col>
                                <MinimalText>{item.umidade}</MinimalText>
                            </Col>
                        </Row>
                    ))}


                </Modalize>
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
        textAlign: 'center',
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


