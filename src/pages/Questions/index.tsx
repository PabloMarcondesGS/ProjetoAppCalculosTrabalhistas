import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { Picker } from '@react-native-community/picker';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-community/async-storage';

// import api from '../../services/api';
// import { useFocusEffect } from '@react-navigation/native';

interface ValuesForm {
  continue: string;
  company_month: number;
  month: number;
  registred: string;
  occupation: string;
  remuneration: number;
  hour_months_clt: number;
  hour_months_pj: number;
  hour_months_without_register: number;
  hour_months_night_pj: number;
  hour_months_night_clt: number;
  hour_months_night_without_register: number;
  benefits_unpaid: number;
  thirteen: number;
  unsuccessful_holidays: number;
  vancation_unpaid: number;
  family_salary: number;
  childrens: number;
  moral_damages: string;
  work_accident: string;
  month_pregnancy: number;
  wage_parity: number;
  months_to_match: number;
  work_risk: string;
  work_risk_gral: string;
  payments_late: number;
  payments_late_days: number;
  payment_differences: number;
}

function TeacherList() {
  const [result, setResult] = useState(0);
  // const [teachers, setTeachers] = useState([]);
  // const [favorites, setFavorites] = useState<number[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [salarioMes, setSalarioMes] = useState([]);
  const [
    quantidadeSalariosAtrasados,
    setQuantidadeSalariosAtrasados,
  ] = useState<number[]>([]);
  const [salarioFamilia, setSalarioFamilia] = useState([]);
  const [feriasVencidas, setferiasVencidas] = useState([]);
  const [bancoHoras, setbancoHoras] = useState([]);
  // const [salarioMes, setSalarioMes] = useState([]);
  // const [salarioMes, setSalarioMes] = useState([]);
  // const [salarioMes, setSalarioMes] = useState([]);
  // const [salarioMes, setSalarioMes] = useState([]);
  // const [salarioMes, setSalarioMes] = useState([]);
  // const [salarioMes, setSalarioMes] = useState([]);
  // const [salarioMes, setSalarioMes] = useState([]);
  // const [salarioMes, setSalarioMes] = useState([]);
  // const [salarioMes, setSalarioMes] = useState([]);
  // const [salarioMes, setSalarioMes] = useState([]);
  // const [salarioMes, setSalarioMes] = useState([]);
  // const [salarioMes, setSalarioMes] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  // function loadFavorite(){
  //     AsyncStorage.getItem('favorites').then(response =>{
  //         if(response){
  //             const favoritedTeachers = JSON.parse(response);
  //             const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
  //                 return teacher.id;
  //             })

  //             setFavorites(favoritedTeachersIds);
  //         }
  //     });
  // }

  function handleToggleFiltersVisible() {
    setIsFilterVisible(!isFilterVisible);
  }

  // useFocusEffect(() =>{
  //     loadFavorite();
  // })

  async function handlerfiltersSubmit() {
    // console.log(data);
    // const response = await api.get('classes',{
    //     params: {
    //       subject,
    //       week_day,
    //       time
    //     }
    //   })

    setIsFilterVisible(false);
    //   setTeachers(response.data);
  }

  const initialValues: ValuesForm = {
    continue: '',
    company_month: 0,
    month: 0,
    registred: '',
    occupation: '',
    remuneration: 0,
    hour_months_clt: 0,
    hour_months_pj: 0,
    hour_months_without_register: 0,
    hour_months_night_pj: 0,
    hour_months_night_clt: 0,
    hour_months_night_without_register: 0,
    benefits_unpaid: 0,
    thirteen: 0,
    unsuccessful_holidays: 0,
    vancation_unpaid: 0,
    family_salary: 0,
    childrens: 0,
    moral_damages: '',
    work_accident: '',
    month_pregnancy: 0,
    wage_parity: 0,
    months_to_match: 0,
    work_risk: '',
    work_risk_gral: '',
    payments_late: 0,
    payments_late_days: 0,
    payment_differences: 0,
  };

  const handleSubmitData = (data: ValuesForm) => {
    let value = 0;
    if (data.continue === 'Sim') {
      value =
        data.remuneration +
        data.hour_months_clt +
        data.hour_months_pj +
        data.hour_months_without_register +
        data.hour_months_night_pj +
        data.hour_months_night_clt +
        data.hour_months_night_without_register +
        data.family_salary +
        data.thirteen +
        data.unsuccessful_holidays +
        data.vancation_unpaid;
    } else {
      value =
        parseInt(data.remuneration.toString()) +
        parseInt(data.hour_months_clt.toString()) +
        parseInt(data.hour_months_pj.toString()) +
        parseInt(data.hour_months_without_register.toString()) +
        parseInt(data.hour_months_night_pj.toString()) +
        parseInt(data.hour_months_night_clt.toString()) +
        parseInt(data.hour_months_night_without_register.toString()) +
        parseInt(data.family_salary.toString()) +
        parseInt(data.thirteen.toString()) +
        parseInt(data.unsuccessful_holidays.toString()) +
        parseInt(data.vancation_unpaid.toString()) +
        ((parseInt(data.remuneration.toString()) * 8) / 100) *
          parseInt(data.company_month.toString()) +
        (((parseInt(data.remuneration.toString()) * 8) / 100) *
          parseInt(data.company_month.toString()) *
          40) /
          100;
      console.log(value);
    }
    setResult(value);
    handleToggleFiltersVisible();
    setIsResultVisible(true);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="Preencha os dados"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFilterVisible && (
          <ScrollView style={styles.searchForm}>
            <Formik initialValues={initialValues} onSubmit={handleSubmitData}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setFieldValue,
              }) => (
                <View>
                  <Text style={styles.label}>Continua Na empresa?</Text>
                  {/* <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('continue')}
                    value={values.continue}
                    placeholder="Sim/Não"
                    placeholderTextColor="#c1bccc"
                  /> */}
                  <View style={styles.backgroundPicker}>
                    <Picker
                      selectedValue={values.continue}
                      style={{ height: 50 }}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('continue', itemValue)
                      }
                    >
                      <Picker.Item label="Sim" value="Sim" />
                      <Picker.Item label="Não" value="Não" />
                    </Picker>
                  </View>
                  <Text style={styles.label}>
                    Tempo de empresa (em meses) ?
                  </Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('company_month')}
                    value={values.company_month.toString()}
                    placeholder="Ex: 10"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Mês de recisão</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('month')}
                    value={values.month.toString()}
                    placeholder="MM"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Registrado?</Text>
                  {/* <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('registred')}
                    value={values.registred}
                    placeholder="Sim/Não"
                    placeholderTextColor="#c1bccc"
                  /> */}
                  <View style={styles.backgroundPicker}>
                    <Picker
                      selectedValue={values.registred}
                      style={{ height: 50 }}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('registred', itemValue)
                      }
                    >
                      <Picker.Item label="Sim" value="Sim" />
                      <Picker.Item label="Não" value="Não" />
                    </Picker>
                  </View>

                  <Text style={styles.label}>Cargo Ocupado?</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    placeholder="Cargo"
                    onChangeText={handleChange('occupation')}
                    value={values.occupation.toString()}
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Remuneração</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('remuneration')}
                    value={values.remuneration.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Hs/Mês não pagas como CLT</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('hour_months_clt')}
                    value={values.hour_months_clt.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Hs/Mês não pagas como PJ</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('hour_months_pj')}
                    value={values.hour_months_pj.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>
                    Hs/Mês não pagas sem registro
                  </Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('hour_months_without_register')}
                    value={values.hour_months_without_register.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>
                    Hs/Mês Noite/Fds não pagas como CLT
                  </Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('hour_months_night_clt')}
                    value={values.hour_months_night_clt.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>
                    Hs/Mês Noite/Fds não pagas como PJ
                  </Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('hour_months_night_pj')}
                    value={values.hour_months_night_pj.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>
                    Hs/Mês Noite/Fds não pagas s/ Registro
                  </Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange(
                      'hour_months_night_without_register'
                    )}
                    value={values.hour_months_night_without_register.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>
                    Existem benefícios não pagos?
                  </Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('benefits_unpaid')}
                    value={values.benefits_unpaid.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>13° não pagos</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('thirteen')}
                    value={values.thirteen.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Quantidade ferias vencidas</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('unsuccessful_holidays')}
                    value={values.unsuccessful_holidays.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Quantidade ferias não pagas</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('vancation_unpaid')}
                    value={values.vancation_unpaid.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Valor Salário familia</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('family_salary')}
                    value={values.family_salary.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Quantidade de filhos</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('childrens')}
                    value={values.childrens.toString()}
                    placeholder="ex: 3"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Há danos morais?</Text>
                  {/* <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('moral_damages')}
                    value={values.moral_damages.toString()}
                    placeholder="Sim/Não"
                    placeholderTextColor="#c1bccc"
                  /> */}
                  <View style={styles.backgroundPicker}>
                    <Picker
                      selectedValue={values.moral_damages}
                      style={{ height: 50 }}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('moral_damages', itemValue)
                      }
                    >
                      <Picker.Item label="Sim" value="Sim" />
                      <Picker.Item label="Não" value="Não" />
                    </Picker>
                  </View>

                  <Text style={styles.label}>Houve acidente de trabalho</Text>
                  {/* <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('work_accident')}
                    value={values.work_accident.toString()}
                    placeholder="Sim/Não"
                    placeholderTextColor="#c1bccc"
                  /> */}
                  <View style={styles.backgroundPicker}>
                    <Picker
                      selectedValue={values.work_accident}
                      style={{ height: 50 }}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('work_accident', itemValue)
                      }
                    >
                      <Picker.Item label="Sim" value="Sim" />
                      <Picker.Item label="Não" value="Não" />
                    </Picker>
                  </View>

                  <Text style={styles.label}>
                    Saiu em qual mes da gravidez?
                  </Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('month_pregnancy')}
                    value={values.month_pregnancy.toString()}
                    placeholder="ex: 5"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Equiparação salarial</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('wage_parity')}
                    value={values.wage_parity.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Meses a equiparar?</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('months_to_match')}
                    value={values.months_to_match.toString()}
                    placeholder="R$"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Risco de trabalho</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('work_risk')}
                    value={values.work_risk.toString()}
                    placeholder="ex: Insalubridade"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Gral de risco de trabalho</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('work_risk_gral')}
                    value={values.work_risk_gral.toString()}
                    placeholder="De 1 a 4"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>
                    Número de pagamentos atrasados
                  </Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('payments_late')}
                    value={values.payments_late.toString()}
                    placeholder="ex: 3"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>
                    Tempo de atraso nos pagamentos(dias)
                  </Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('payments_late_days')}
                    value={values.payments_late_days.toString()}
                    placeholder="ex: 8"
                    keyboardType="numeric"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Divergencias de pagamentos?</Text>
                  {/* <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('payment_differences')}
                    value={values.payment_differences.toString()}
                    placeholder="ex: Sim/Não"
                    placeholderTextColor="#c1bccc"
                  /> */}
                  <View style={styles.backgroundPicker}>
                    <Picker
                      selectedValue={values.payment_differences}
                      style={{ height: 50 }}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('payment_differences', itemValue)
                      }
                    >
                      <Picker.Item label="Sim" value="Sim" />
                      <Picker.Item label="Não" value="Não" />
                    </Picker>
                  </View>
                  <View style={{ marginBottom: 120 }}>
                    <TouchableOpacity
                      onPress={handleSubmit as any}
                      style={styles.buttonStyle}
                    >
                      <Text style={styles.textButtonStyle}>Calcular</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
            <RectButton
              onPress={handlerfiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </ScrollView>
        )}
        {isResultVisible && <Text>O resultado final é: {result} reais</Text>}
      </PageHeader>
    </View>
  );
}

export default TeacherList;
