import React, { useMemo, useState } from 'react';
import { View, ScrollView, Text, TextInput, Picker } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import * as Yup from "yup";

import Input from "../../components/Input";
import Select from '../../components/Select';
import { Item } from 'react-native-picker-select';

// import AsyncStorage from '@react-native-community/async-storage';

// import api from '../../services/api';
// import { useFocusEffect } from '@react-navigation/native';

interface FormDataProps {
  demissionJustyfied: string;
  serviceTimeProvided: string;
  recisionMonth: number;
  recisionDay: number;
  positionHeld: string;
  remuneration: number;
  typeOfHiring: string;
  pendentHours: number;
  pendentHoursNotRegistered: string;
  pendentNightFdsHours: string;
  pendentNightFdsHoursNotRegistered: string;
  hasPendentBenefits: string;
  pendent13Qty: string;
  holidaysExpired: string;
  holidaysPendent: string;
  familySalary: number;
  childrensQty: number;
  hasMoralDamage: string;
  wasAccidentInWork: string;
  leftWichMonthPregnancy: string;
  wageParity: string;
  monthsToMatch: string;
  pendentPaymentsQty: string;
  paymentsDivergency: string;
}

const schema = Yup.object().shape({
  demissionJustyfied: Yup.string().oneOf(["Sim", "Não"], "Escolha uma opção").nullable(),
  serviceTimeProvided: Yup.string().required("Este campo é obrigatório").nullable(),
  recisionMonth: Yup.string().required("Este campo é obrigatório").nullable(),
  recisionDay: Yup.string().required("Este campo é obrigatório").nullable(),
  positionHeld: Yup.string().nullable(),
  remuneration: Yup.string().required("Este campo é obrigatório").nullable(),
  typeOfHiring: Yup.string().oneOf(["CLT", "PJ"], "Escolha uma opção").nullable(),
  pendentHours: Yup.string().required("Este campo é obrigatório").nullable(),
  pendentHoursNotRegistered: Yup.string().required("Este campo é obrigatório").nullable(),
  pendentNightFdsHours: Yup.string().required("Este campo é obrigatório").nullable(),
  pendentNightFdsHoursNotRegistered: Yup.string().required("Este campo é obrigatório").nullable(),
  hasPendentBenefits: Yup.string().oneOf(["Sim", "Não"], "Escolha uma opção").nullable(),
  pendent13Qty: Yup.string().required("Este campo é obrigatório").nullable(),
  holidaysExpired: Yup.string().required("Este campo é obrigatório").nullable(),
  holidaysPendent: Yup.string().required("Este campo é obrigatório").nullable(),
  familySalary: Yup.string().required("Este campo é obrigatório").nullable(),
  childrensQty: Yup.string().nullable(),
  hasMoralDamage: Yup.string().oneOf(["Sim", "Não"], "Escolha uma opção").nullable(),
  wasAccidentInWork: Yup.string().oneOf(["Sim", "Não"], "Escolha uma opção").nullable(),
  leftWichMonthPregnancy: Yup.string().nullable(),
  wageParity: Yup.string().nullable(),
  monthsToMatch: Yup.string().nullable(),
  pendentPaymentsQty: Yup.string().required("Este campo é obrigatório").nullable(),
  paymentsDivergency: Yup.string().oneOf(["Sim", "Não"], "Escolha uma opção").nullable(),
})

function TeacherList() {
  const [ isFilterVisible, setIsFilterVisible ] = useState(false);
  const {control, handleSubmit, errors, getValues, watch} = useForm<FormDataProps>({
    resolver: yupResolver(schema),
  });
  
  const [balance, setBalance] = useState<any>(null);
  
  const watchSelectedMonth = watch("recisionMonth", -1);
  
  const placeholder: Item = {label: "Escolha uma opção", value: null, color:"#c1bccc"};
  const optionsSimNao: Item[] = [{label: "Sim", value: "Sim"}, {label: "Não", value: "Não"}]
  const optionsHiring: Item[] = [{label: "CLT", value: "CLT"}, {label: "PJ", value: "PJ"}];
  const optionsMonth: Item[] = [
    {label: "Janeiro", value: 1},
    {label: "Fevereiro", value: 2},
    {label: "Março", value: 3},
    {label: "Abril", value: 4},
    {label: "Maio", value: 5},
    {label: "Junho", value: 6},
    {label: "Julho", value: 7},
    {label: "Agosto", value: 8},
    {label: "Setembro", value: 9},
    {label: "Outubro", value: 10},
    {label: "Novembro", value: 11},
    {label: "Dezembro", value: 12},
  ];
  
  const optionsDaysInMounth = useMemo(() => {
    const {recisionMonth} = getValues();
    let totalDaysInMonth = 0;
    let options: Item[] = [];
    
    //pegar dias relativos do mes.
    if(recisionMonth === 2){
      totalDaysInMonth = 28;
    }else if(recisionMonth % 2 === 1){
      totalDaysInMonth = 31;
    }else{
      totalDaysInMonth = 30;
    }
    
    for (let index = 1; index <= totalDaysInMonth; index++) {
      options.push({label: index.toString(), value: index});
    }
    
    return options;
    
  }, [watchSelectedMonth]);
  
  
  const calculateBalance = (data: FormDataProps) => {
    const {demissionJustyfied, serviceTimeProvided, remuneration, pendentPaymentsQty, familySalary, recisionMonth, recisionDay, holidaysPendent, holidaysExpired, pendentHours} = data;
    
    const valueOfDay = remuneration / optionsDaysInMounth.length;
    
    const rangeDaysOfRecision = optionsDaysInMounth.length - recisionDay;
    
    const proporcionalSalary = valueOfDay *  rangeDaysOfRecision;
    
    const pendentPayments = Number(pendentPaymentsQty) * remuneration;
    
    const proporcional13 = (remuneration / 12) * (recisionMonth - 1);
    
    const totalPendentHolidays = (remuneration * Number(holidaysPendent)) + ((remuneration * Number(holidaysPendent)) / 3);
    
    const totalPendentHolidaysProporcional = 
    ((remuneration / 12) * (recisionMonth - 1)) + (((remuneration / 12) * (recisionMonth - 1)) / 3);
    
    const valueOfHour = remuneration / (optionsDaysInMounth.length * 8);
    
    const bankOfOurs = valueOfHour * pendentHours;
    
    const fgts = Number(serviceTimeProvided) * (remuneration * 0.08);
    const multa = fgts + (fgts * 0.4);
    
    let unemploymentInsurance = 0;
    
    if (remuneration <= 1599.61){
      unemploymentInsurance = remuneration * 0.8;
    }else if (remuneration > 1599.61 && remuneration <= 2666.29){
      unemploymentInsurance = 1279.69 + ((remuneration - 1599.61) * 0.5);
    }else {
      unemploymentInsurance = 1813.03;
    }
    
    let balance = 0;
    
    if(demissionJustyfied){
      balance = proporcionalSalary + pendentPayments + Number(familySalary) 
      + proporcional13 + totalPendentHolidays + totalPendentHolidaysProporcional + bankOfOurs + fgts + multa + unemploymentInsurance;
    }else{
      balance = proporcionalSalary + pendentPayments + Number(familySalary) 
      + proporcional13 + totalPendentHolidays + totalPendentHolidaysProporcional + bankOfOurs;
    }

    const response = {
      proporcionalSalary, 
      totalPendentHolidays, 
      totalPendentHolidaysProporcional, 
      proporcional13,
      FgtsMulta: fgts+multa, 
      totalRecision: balance, 
      unemploymentInsurancePacel: unemploymentInsurance
    };

    return response;
  }
  
  const onSubmit = (data: FormDataProps) => {

    const res = calculateBalance(data);
    setBalance(res);

    setIsFilterVisible(false);
    
  };
  
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
  
  async function handlerfiltersSubmit(){
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
  
  return (
    <View style={styles.container}>
    <PageHeader
    title="Preencha os dados"
    headerRight={(
      <BorderlessButton onPress={handleToggleFiltersVisible}>
      <Feather
      name="chevron-down"
      size={30}
      color="#FFF"
      />
      </BorderlessButton>
      )}
      >
      { isFilterVisible && (
        <ScrollView style={styles.searchForm} showsHorizontalScrollIndicator={false}>
        <Select
        controller={control}
        options={optionsSimNao}
        error={errors.demissionJustyfied?.message}
        label="Demissão por justa causa?"
        name="demissionJustyfied"
        placeholder={placeholder}/>
        
        <Input
        controller={control}
        error={errors.demissionJustyfied?.message}
        label="Tempo de serviço prestado (Em meses)"
        name="serviceTimeProvided"
        placeholder="12"/>
        
        <Select
        controller={control}
        error={errors.recisionMonth?.message}
        label="Mês de recisão"
        name="recisionMonth"
        options={optionsMonth}
        placeholder={placeholder}/>
        
        {watchSelectedMonth > 0 &&
          <Select
          controller={control}
          error={errors.recisionDay?.message}
          label="Dia de recisão"
          name="recisionDay"
          options={optionsDaysInMounth}
          placeholder={placeholder}/>
        }
        
        <Input
        controller={control}
        error={errors.positionHeld?.message}
        label="Cargo Ocupado?"
        name="positionHeld"
        placeholder="Cargo"/>
        
        <Input
        controller={control}
        error={errors.remuneration?.message}
        label="Remuneração"
        name="remuneration"
        placeholder="Ex: 3500"/>
        
        <Select
        controller={control}
        options={optionsHiring}
        error={errors.typeOfHiring?.message}
        label="Tipo de contratação"
        name="typeOfHiring"
        placeholder={placeholder}/>
        
        <Input
        controller={control}
        error={errors.pendentHours?.message}
        label="Horas/Mês não pagas"
        name="pendentHours"/>
        
        <Input
        controller={control}
        error={errors.pendentHoursNotRegistered?.message}
        label="Horas/Mês não pagas sem registro"
        name="pendentHoursNotRegistered"/>
        
        <Input
        controller={control}
        error={errors.pendentNightFdsHours?.message}
        label="Horas/Mês Noite/Fds não pagas"
        name="pendentNightFdsHours"/>
        
        <Input
        controller={control}
        error={errors.pendentNightFdsHoursNotRegistered?.message}
        label="Horas/Mês Noite/Fds não pagas sem registro"
        name="pendentNightFdsHoursNotRegistered"/>
        
        <Select
        controller={control}
        options={optionsSimNao}
        error={errors.hasPendentBenefits?.message}
        label="Existem benefícios não pagos?"
        name="hasPendentBenefits"
        placeholder={placeholder}/>
        
        <Input
        controller={control}
        error={errors.pendent13Qty?.message}
        label="13° não pagos"
        name="pendent13Qty"
        defaultValue="0"/>
        
        <Input
        controller={control}
        error={errors.holidaysExpired?.message}
        label="Quantidade ferias vencidas"
        name="holidaysExpired"
        defaultValue='0'/>
        
        <Input
        controller={control}
        error={errors.holidaysPendent?.message}
        label="Quantidade ferias não pagas"
        name="holidaysPendent"
        defaultValue='0'/>
        
        <Input
        controller={control}
        error={errors.familySalary?.message}
        label="Valor Salário familia"
        name="familySalary"
        placeholder="Ex: 5200"/>
        
        <Input
        controller={control}
        error={errors.childrensQty?.message}
        label="Quantidade de filhos"
        name="childrensQty"
        placeholder="Ex: 3"/>
        
        <Select
        controller={control}
        options={optionsSimNao}
        error={errors.hasMoralDamage?.message}
        label="Há danos morais?"
        name="hasMoralDamage"
        placeholder={placeholder}/>
        
        
        <Select
        controller={control}
        error={errors.wasAccidentInWork?.message}
        options={optionsSimNao}
        label="Houve acidente de trabalho"
        name="wasAccidentInWork"
        placeholder={placeholder}/>
        
        <Input
        controller={control}
        error={errors.leftWichMonthPregnancy?.message}
        label="Saiu em qual mes da gravidez?"
        name="leftWichMonthPregnancy"
        placeholder="Ex: 5"/>
        
        <Input
        controller={control}
        error={errors.wageParity?.message}
        label="Equiparação salarial"
        name="wageParity"/>
        
        <Input
        controller={control}
        error={errors.monthsToMatch?.message}
        label="Meses a equiparar?"
        name="monthsToMatch"
        placeholder="Ex 3"/>
        
        <Input
        controller={control}
        error={errors.pendentPaymentsQty?.message}
        label="Número de pagamentos atrasados"
        name="pendentPaymentsQty"
        placeholder="Ex: 5"/>
        
        <Select
        controller={control}
        error={errors.paymentsDivergency?.message}
        label="Divergencias de pagamentos?"
        name="paymentsDivergency"
        options={optionsSimNao}
        placeholder={placeholder}/>
        
        <RectButton onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Gerar resultados</Text>
        </RectButton>
        </ScrollView>
        )}
        </PageHeader>
        
        <View style={styles.body}>
        {!balance ? <Text>Preencha o formulário para que sejam gerados os dados</Text> : 
          (
            <>
            { balance && (
              <View>
              <Text>{JSON.stringify(balance, null, 2)}</Text>
              </View>
              )
            }
            </>
            )
          }
          </View>
          
          </View>
          )
        }
        
        export default TeacherList;
        