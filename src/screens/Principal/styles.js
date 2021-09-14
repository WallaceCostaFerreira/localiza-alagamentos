import styled from 'styled-components/native';
import theme from '../../constants/theme';

export const Container = styled.SafeAreaView`
    flex:1;
    background: ${theme.colors.white};
`;

export const MenuButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    padding: 8px;
    position: absolute;
`;

export const AddButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    padding: 8px;
    border-radius: 25px;
    position: absolute;
    background: ${theme.colors.primary};
    align-items: center;
    justify-content: center;
    bottom: 0;
    right: 0;
    margin: 8px;
`;