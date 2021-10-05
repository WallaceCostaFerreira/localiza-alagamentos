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

export const TitleText = styled.Text`
    font-size: 20px;
    color:${theme.colors.text};
    margin:10px;
    margin-top: 15px;
`;

export const SubtitleText = styled.Text`
    font-size: 16px;
    color:${theme.colors.text};
    margin:10px;
    margin-top: 0px;
`;

export const Row = styled.View`
    flex-direction: row;
    height: 100px;
    justify-content: space-around;
`;

export const Col = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const ImageLevel = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 35px;
`;

export const MinimalText = styled.Text`
    font-size: 12px;
    color:${theme.colors.text};
    margin-top: 3px;
`;

export const ButtonReport = styled.TouchableOpacity`
    width: 200px;
    height: 40px;
    margin-top:10px;
    background: ${theme.colors.primaryDark};
    align-items: center;
    justify-content: center;
    border-radius: 20px;
`;

export const TextButtonReport = styled.Text`
    font-size: 20px;
    color: ${theme.colors.white};
`;

export const MyCustomCalloutView = styled.View`
    width: 100px;
    height: 100px;
    background: ${theme.colors.primary};
`;

