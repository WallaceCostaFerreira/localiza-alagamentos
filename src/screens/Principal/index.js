import React, { Component } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../constants/theme'

import {
    Container,
    MenuButton,
    AddButton
} from './styles'

export default function Principal(){
    return (
        <Container>
            <MenuButton>
                <Feather
                    name={'menu'}
                    size={30}
                    color= {theme.colors.primary}
                />
            </MenuButton>
            <AddButton>
                <Feather
                    name={'plus'}
                    size={30}
                    color= {theme.colors.white}
                />
            </AddButton>
        </Container>
    )
}
