import React, { useRef, useState, useEffect } from 'react'
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
import { render } from 'react-dom';

export default function Principal({navigation}){
    const [nivel, setNivel] = useState('');
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const modalizeAddFlooding = useRef(null);

    let dadosRecuperados = [];

    api.get('/consulta_dados.php').then(response => {
        response.data.map(function(dado){
            dadosRecuperados.push(dado);
        })
    }).catch((error) => {
        console.log('Erro ao pegar dados! '+error)
    })

    

    const openHist = () =>{
        dadosRecuperados.map(function(dados){
            console.log(dados.latitude);
        });
        // navigation.navigate('Historico')
    }

    pushReport = async () =>{
      setLoading(true);

      let location = await Location.getCurrentPositionAsync({});
      
      setLoading(false);
      modalizeAddFlooding.current?.close();
    }
  
    const addFlooding = () => {
        modalizeAddFlooding.current?.open();
    };

    const enviaDados = () => {

        let dados = {
            longitude: location.latitude,
            latitude: location.longitude,
            nivel: nivel,
            titulo: "",
            descricao: ""
        };

        api.get(`/salva_alagamento.php?titulo=${dados.titulo}&descricao=${dados.descricao}&nivel=${dados.nivel}&longitude=${dados.longitude}&latitude=${dados.latitude}`).then(response => {
            if(response.status >= 200 && response.status <= 300){
                ToastAndroid.show("Reporte enviado com sucesso!",ToastAndroid.SHORT);
                modalizeAddFlooding.current?.close();
            }else{
                ToastAndroid.show("Tente novamente mais tarde!",ToastAndroid.SHORT);
                modalizeAddFlooding.current?.close();
            }
        }).catch((error) => {
            console.log('Error retrieving data'+error)
        })
    }

    const handleNivel = (nivelName) =>{
        setNivel(nivelName);
    }

    const geraMarcadores = () =>{
        console.log("TESTE geraMarcadores ",dados.latitude);
        return(
            dadosRecuperados.map(function(dados, index){
                <Marker
                    key={index}
                    coordinate={{
                        latitude: dados.latitude != null ? parseFloat(dados.latitude) : 37.4219296,
                        longitude: dados.longitude != null ? parseFloat(dados.longitude) : -122.0841003,
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
                        : 'Poças por todos os lados'}
                >
                </Marker>
            })
        );
    }

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      })();
    }, []);

    return (
        <Container>
            <MapView 
                style={styles.map}
                region={{
                    latitude: location != null ? location.latitude : 37.4219296,
                    longitude: location != null ? location.longitude : -122.0841003,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }}
                customMapStyle={mapStyle}>
                  
                {console.log("TESTE FORA ",dadosRecuperados)}

                {geraMarcadores}
            </MapView>
            <MenuButton
                onPress={openHist}>
                <Feather
                    name={'bar-chart'}
                    size={30}
                    color= {theme.colors.primary}
                />
            </MenuButton>
            <AddButton
                onPress={addFlooding}>
                <Feather
                    name={'plus'}
                    size={30}
                    color= {theme.colors.white}
                />
            </AddButton>

            <Modalize
                ref={modalizeAddFlooding}
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
                    <Col onPress={ () => handleNivel('baixo')}>
                        <ImageLevel source={imgBaixo}
                        style={ [nivel == 'baixo' && styles.selected]} />
                        <MinimalText>Baixo</MinimalText>
                    </Col>
                    <Col onPress={ () => handleNivel('medio')}>
                        <ImageLevel source={imgMedio}
                        style={ [nivel == 'medio' && styles.selected] }/>
                        <MinimalText>Médio</MinimalText>
                    </Col>
                    <Col onPress={ () =>  handleNivel('alto')}>
                        <ImageLevel source={imgAlto}
                        style={ [nivel == 'alto' && styles.selected] }/>
                        <MinimalText>Alto</MinimalText>
                    </Col>
                </Row>
                <Row>
                    <ButtonReport onPress={pushReport}>
                        {loading 
                        ? <ActivityIndicator size="small" color={theme.colors.white} />
                        : <TextButtonReport onPress={ enviaDados }>Reportar</TextButtonReport>}
                    </ButtonReport>
                </Row>
            </Modalize>

        </Container>
    )
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
