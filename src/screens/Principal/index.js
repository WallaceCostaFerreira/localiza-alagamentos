import React, { Component } from 'react'
import { Modalize } from 'react-native-modalize';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios'

import { StyleSheet, Dimensions, ActivityIndicator, ToastAndroid  } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../constants/theme'

import imgBaixo from '../../assets/images/baixo.png';
import imgMedio from '../../assets/images/medio.png';
import imgAlto from '../../assets/images/alto.png';

import api from './api';

import testImage from '../../../assets/mipmap-hdpi/ic_alto.png';

import {
    Container,
    MenuButton,
    AddButton,
    TitleText,
    SubtitleText,
    Row,
    Col,
    ImageLevel,
    MinimalText,
    ButtonReport,
    TextButtonReport,
    MyCustomCalloutView 
} from './styles'

import mapStyle from './mapStyle.json';

export default class Principal extends Component{
    constructor(props){
        super(props);
        this.state = { 
            nivel: '',
            location: null,
            errorMsg: '',
            loading: false,
            dadosApi: []
        }
    }

    modalizeAddFlooding = React.createRef();

    // Roda antes de montar a tela
    componentDidMount = async () =>{
        await this.pegaReportesAPI();
        await this.pegaLocalizacaoAtual();
    }

    // Utiliza o GPS para pegar localização atual
    pegaLocalizacaoAtual = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            this.setState({errorMsg: "Permissão de acesso a localização negada!"});
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        this.setState({location: location.coords});
    }

    // Pega dados de reporte da API 
    pegaReportesAPI = async () => {
        api.get('/consulta_dados.php').then(response => {
            
            this.setState({ dadosApi: response.data })

        }).catch((error) => {
            console.log('Erro ao pegar dados! '+error)
        })
    }
    
    // Vai para a tela de estatísticas
    openHist = () =>{
        this.props.navigation.navigate('Historico')
    }


    pushReport = async () =>{
        this.setState({loading: true});

        let location = await Location.getCurrentPositionAsync({});
        
        this.setState({loading: false});
        
        this.modalizeAddFlooding.current?.close();
    }
  
    // Abre modal de reporte de alagamento
    addFlooding = () => {
        this.modalizeAddFlooding.current?.open();
    };

    // Salva dados do reporte na API
    enviaDados = () => {

        let dados = {
            longitude: this.state.location.longitude,
            latitude: this.state.location.latitude,
            nivel: this.state.nivel,
            titulo: "",
            descricao: ""
        };

        api.get(`/salva_alagamento.php?titulo=${dados.titulo}&descricao=${dados.descricao}&nivel=${dados.nivel}&longitude=${dados.longitude}&latitude=${dados.latitude}`).then(response => {
            if(response.status >= 200 && response.status <= 300){
                ToastAndroid.show("Reporte enviado com sucesso!",ToastAndroid.SHORT);
                this.modalizeAddFlooding.current?.close();
            }else{
                ToastAndroid.show("Tente novamente mais tarde!",ToastAndroid.SHORT);
                this.modalizeAddFlooding.current?.close();
            }
        }).catch((error) => {
            console.log('Error ao salvar dados na API'+error)
        })
    }

    // Seleciona o nível da água para reporte
    handleNivel = (nivelName) =>{
        this.setState({nivel: nivelName})
    }

    render(){
        return (
            <Container>
                {this.state.location != null ? 
                    <MapView 
                        style={styles.map}
                        region={{
                            latitude: this.state.location != undefined ? this.state.location.latitude : 37.4219296,
                            longitude: this.state.location != undefined ? this.state.location.longitude : -122.0841003,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121
                        }}
                        customMapStyle={mapStyle}>
                        {this.state.dadosApi.map((dados, index) => (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: dados.latitude != null ? parseFloat(dados.latitude) : -122.0841637,
                                    longitude:dados.longitude != null ?  parseFloat(dados.longitude) : 37.4218201,
                                }}
                                image={dados.nivel == 'alto' 
                                    ? require(`../../assets/images/marker_alto_alterado.png`)
                                    : dados.nivel == 'medio' 
                                    ? require(`../../assets/images/marker_medio_alterado.png`)
                                    : require(`../../assets/images/marker_baixo_alterado.png`)}
                                
                                title={dados.nivel == 'alto' 
                                    ? 'Nível Alto'
                                    : dados.nivel == 'medio' 
                                    ? 'Nível Médio'
                                    : 'Nível Baixo'}
                                
                                description={dados.nivel == 'alto' 
                                    ? 'Inundação'
                                    : dados.nivel == 'medio' 
                                    ? 'Água na canela'
                                    : 'Poças por todos os lados'
                                }
                            />
                        ))}
                    </MapView>
                    :
                    <ActivityIndicator style={{top:'45%'}}size="large" color={theme.colors.primary}/>
                }
                <MenuButton
                    onPress={this.openHist}>
                    <Feather
                        name={'bar-chart'}
                        size={30}
                        color= {theme.colors.primary}
                    />
                </MenuButton>
                <AddButton
                    onPress={this.addFlooding}>
                    <Feather
                        name={'plus'}
                        size={30}
                        color= {theme.colors.white}
                    />
                </AddButton>

                <Modalize
                    ref={this.modalizeAddFlooding}
                    scrollViewProps={{ showsVerticalScrollIndicator: false }}
                    snapPoint={270}
                    modalHeight={270}
                    handleStyle={{
                        backgroundColor:theme.colors.primaryDark,
                        marginTop:20
                    }}
                >
                    <TitleText>Relatar alagamento</TitleText>
                    <SubtitleText>Nivel da Água</SubtitleText>

                    <Row>
                        <Col onPress={ () => this.handleNivel('baixo')}>
                            <ImageLevel source={imgBaixo}
                            style={ [this.state.nivel == 'baixo' && styles.selected]} />
                            <MinimalText>Baixo</MinimalText>
                        </Col>
                        <Col onPress={ () => this.handleNivel('medio')}>
                            <ImageLevel source={imgMedio}
                            style={ [this.state.nivel == 'medio' && styles.selected] }/>
                            <MinimalText>Médio</MinimalText>
                        </Col>
                        <Col onPress={ () =>  this.handleNivel('alto')}>
                            <ImageLevel source={imgAlto}
                            style={ [this.state.nivel == 'alto' && styles.selected] }/>
                            <MinimalText>Alto</MinimalText>
                        </Col>
                    </Row>
                    <Row>
                        <ButtonReport onPress={this.pushReport}>
                            {this.state.loading 
                            ? <ActivityIndicator size="small" color={theme.colors.white} />
                            : <TextButtonReport onPress={ this.enviaDados }>Reportar</TextButtonReport>}
                        </ButtonReport>
                    </Row>
                </Modalize>

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    selected: {
        borderWidth: 3,
        borderColor: theme.colors.text
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
