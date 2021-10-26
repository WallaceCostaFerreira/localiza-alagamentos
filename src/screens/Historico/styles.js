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
`;

export const Title = styled.Text`
    color: ${theme.colors.primaryDark};
    text-transform: uppercase;
    font-size: 16px;
`;

export const Col = styled.View`
    justify-content: center;
    align-items: center;
`;

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-around;
`;

export const DescText = styled.Text`
    font-size: 18px;
    color:${theme.colors.text};
    margin-top: 3px;
`;


