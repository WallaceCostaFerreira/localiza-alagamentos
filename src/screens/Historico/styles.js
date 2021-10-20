import styled from 'styled-components/native';
import theme from '../../constants/theme';

export const Container = styled.SafeAreaView`
    flex:1;
    background: ${theme.colors.white};
`;

export const BackButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    padding: 8px;
`;

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #999;
`;

export const Title = styled.Text`
    color: ${theme.colors.primaryDark};
    text-transform: uppercase;
    font-size: 16px;
`;



