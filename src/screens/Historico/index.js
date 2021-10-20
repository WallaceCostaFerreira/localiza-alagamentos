import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import Feather from 'react-native-vector-icons/Feather';

import { 
    StyleSheet, 
    ActivityIndicator  } from 'react-native';

import {
    Container,
    BackButton,
    Title,
    Header
} from './styles'
import { FlatList } from 'react-native-gesture-handler';

export default function Historico({navigation}){

    const goBack = () =>{
        navigation.goBack();
    }

    const renderItem = () => {

        return (
            <Header></Header>
        )
    }

    return (
        <Container>
            <Header>
                <BackButton
                    onPress={ goBack }>
                    <Feather
                        name={'arrow-left'}
                        size={30}
                        color= {theme.colors.primary}
                    />
                </BackButton>
                <Title>Dados estatísticos</Title>
                <BackButton></BackButton>
            </Header>
            <Body>
                <FlatList
                    renderItem={renderItem}
                />
            </Body>
        </Container>
    )
}
