import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [ isFilterVisible, setIsFilterVisible ] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorite(){
        AsyncStorage.getItem('favorites').then(response =>{
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })

                setFavorites(favoritedTeachersIds);
            }
        });
    }

    function handleToggleFiltersVisible() {
        setIsFilterVisible(!isFilterVisible);
    }
    
    useFocusEffect(() =>{
        loadFavorite();
    })

    async function handlerfiltersSubmit(){
        loadFavorite();
        const response = await api.get('classes',{
            params: {
              subject,
              week_day,
              time
            }
          })
        
          setIsFilterVisible(false);
          setTeachers(response.data);
    }
    
    return (
        <View style={styles.container}>
            <PageHeader 
                title="Preencha os dados" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather 
                            name="filter" 
                            size={20} 
                            color="#FFF" 
                        />
                    </BorderlessButton>
                )}
            >
                { isFilterVisible && (
                    <ScrollView style={styles.searchForm}>
                        <Text style={styles.label}>Continua Na empresa?</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Sim/Não"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Mês de recisão</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="MM"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Registrado?</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Sim/Não"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Cargo Ocupado?</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Cargo"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Remuneração</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Hs/Mês não pagas como CLT</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            // placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Hs/Mês não pagas como PJ</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            // placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Hs/Mês não pagas sem registro</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            defaultValue='Não'
                            placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Hs/Mês Noite/Fds não pagas como CLT</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            defaultValue='Não'
                            placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Hs/Mês Noite/Fds não pagas como PJ</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            defaultValue='Não'
                            placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Hs/Mês Noite/Fds não pagas s/ Registro</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            defaultValue='Não'
                            placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Existem benefícios não pagos?</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            defaultValue='Não'
                            placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>13° não pagos</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            defaultValue='Não'
                            placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Quantidade ferias vencidas</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            defaultValue='Não'
                            placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Quantidade ferias não pagas</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            defaultValue='Não'
                            placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Valor Salário familia</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Quantidade de filhos</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="ex: 3"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Há danos morais?</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="ex: 3"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Houve acidente de trabalho</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="ex: 3"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Saiu em qual mes da gravidez?</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="ex: 5"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Equiparação salarial</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Meses a equiparar?</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="R$"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Risco de trabalho</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="ex: Insalubridade"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Gral de risco de trabalho</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="ex: Insalubridade"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Número de pagamentos atrasados</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="ex: Insalubridade"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Tempo de atraso nos pagamentos(dias)</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="ex: 8"
                            placeholderTextColor="#c1bccc"
                        />

                        <Text style={styles.label}>Divergencias de pagamentos?</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="ex: Sim/Não"
                            placeholderTextColor="#c1bccc"
                        />
                        <RectButton onPress={handlerfiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </ScrollView>
                )}
            </PageHeader>
        </View>
    )
}

export default TeacherList;