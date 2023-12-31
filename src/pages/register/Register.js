import {
    IonInput,
    IonButton,
    IonSelect,
    IonToolbar,
    IonItem,
    IonList,
    IonLabel,
    IonNote,
    IonHeader,
    IonGrid,
    IonRow,
    IonButtons,
    IonCol,
    IonBackButton,
    IonPage,
    IonTitle,
    IonSelectOption,
    IonContent,
    IonText,
    IonIcon
} from '@ionic/react';
import { warningOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useMaskito } from '@maskito/react';
import './register-style.css'


function Register() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [city, setCity] = useState();
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [matricula, setMatricula] = useState('');
    const [yars, setYares] = useState('');
    const [situation, setSituation] = useState('');

    const [isValidEmail, setIsValidEmail] = useState(undefined);
    const [isValidPhone, setIsValidPhone] = useState(undefined);
    const [isValidPassword, setIsValidPassword] = useState(undefined);

    const validateEmailFormat = (email) => {
        return email.match(/^[A-Z0-9._%+-]+@(gmail|hotmail|outlook)+\.com$/i);
    };

    const validatePhoneFormat = (phone) => {
        return phone.match(/^\(\d{2}\) \d{5}-\d{4}$/);
    };

    const validatePasswordFormat = (password) => {
        return password.match(/^(.{6,})$/);
    };

    const phoneMask = useMaskito({
        options: {
            mask: ['(', /\d/, /\d/, ')', ' ', '9', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        },
    });

    const validateEmail = (event) => {
        const value = (event.target).value;
        if (value === '') { setIsValidEmail(false); return };
        validateEmailFormat(value) !== null ? setIsValidEmail(true) : setIsValidEmail(false);
    };

    const validatePhone = (event) => {
        const value = (event.target).value;
        if (value === '') { setIsValidEmail(false); return };
        validatePhoneFormat(value) !== null ? setIsValidPhone(true) : setIsValidPhone(false);
    };

    const validatePassword = (event) => {
        const value = (event.target).value;
        if (value === '') { setIsValidPassword(false); return };
        validatePasswordFormat(value) !== null ? setIsValidPassword(true) : setIsValidPassword(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="#"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Cadastro {email}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding' style={{'--background':'transparent'}}>
                <IonList className='register-list'>
                    <IonItem fill='outline'
                        className={`${name && 'ion-valid'} ${name === '' && 'ion-invalid'}`}>
                        <IonLabel position='floating'>Nome</IonLabel>
                        <IonInput
                            clearInput={true}
                            type='text'
                            required='true'
                            placeholder='Insira o nome completo'
                            value={name}
                            onIonInput={(event) => setName(event.target.value)}
                            onIonChange={(event) => setName(event.detail.value)}
                            onIonFocus={() => {if(!name) setName('') }}
                        />
                        <IonNote slot="error">Insira o nome completo.</IonNote>
                        <IonNote slot="error"><IonText color="warning"><IonIcon icon={warningOutline}/> Obrigatório!</IonText></IonNote>
                    </IonItem>
                    <IonItem fill='outline'
                        className={`${isValidEmail && 'ion-valid'} ${isValidEmail === false && 'ion-invalid'}`}>
                        <IonLabel position='floating'>Email</IonLabel>
                        <IonInput
                            clearInput={true}
                            type='email'
                            placeholder='email@domain.com'
                            onIonInput={(event) => { validateEmail(event) }}
                            onIonChange={(event) => setEmail(event.detail.value)}
                            onIonFocus={() => {if(!email) setIsValidEmail(false) }}
                        />
                        <IonNote slot="error">Insira um email válido.</IonNote>
                        <IonNote slot="error"><IonText color="warning"><IonIcon icon={warningOutline}/> Obrigatório!</IonText></IonNote>
                    </IonItem>
                    <IonItem fill='outline'
                        className={`${isValidPassword && 'ion-valid'} ${isValidPassword === false && 'ion-invalid'}`}>
                        <IonLabel position='floating'>Senha</IonLabel>
                        <IonInput
                            clearInput={true}
                            type='password'
                            onIonInput={(event) => validatePassword(event)}
                            onIonChange={(event) => setPassword(event.detail.value)}
                            onIonFocus={() => {if(!password) setIsValidPassword(false) }}
                        />
                        <IonNote slot="error">{ !password ? "Insira uma senha." : "A senha deve conter no mínimo 6 caracteres." }</IonNote>
                        <IonNote slot="error"><IonText color="warning"><IonIcon icon={warningOutline}/> Obrigatório!</IonText></IonNote>
                    </IonItem>
                    <IonItem fill='outline' >
                        <IonLabel position='floating'>Cidade</IonLabel>
                        <IonSelect>
                            <IonSelectOption value='Campina Grande'>Campina Grande</IonSelectOption>
                            <IonSelectOption value='Recife'>Recife</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem fill='outline' >
                        <IonLabel position='floating'>Cargo</IonLabel>
                        <IonSelect>
                            <IonSelectOption value='Agente'>Agente</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem fill='outline'
                        className={`${isValidPhone && 'ion-valid'} ${isValidPhone === false && 'ion-invalid'}`}>
                        <IonLabel position='floating'>Telefone</IonLabel>
                        <IonInput
                            ref={async (phoneInput) => {
                                if (phoneInput) {
                                    const input = await phoneInput.getInputElement();
                                    phoneMask(input);
                                }
                            }}
                            clearInput={true}
                            placeholder='(DDD) 90000-0000'
                            onIonInput={(event) => validatePhone(event)}
                        />
                        <IonNote slot="error">Telefone inválido</IonNote>
                    </IonItem>
                    <IonGrid style={{ padding: 0 }}>
                        <IonRow>
                            <IonCol style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 0 }}>
                                <IonItem fill='outline'>
                                    <IonLabel position='floating'>Matrícula</IonLabel>
                                    <IonInput clearInput={true}></IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol style={{ paddingTop: 0, paddingBottom: 0, paddingRight: 0 }}>
                                <IonItem fill='outline' >
                                    <IonLabel position='floating'>Anos de Experiência</IonLabel>
                                    <IonInput
                                        type='number'
                                        value={0}
                                        min={0}
                                        max={100}
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonItem fill='outline' >
                        <IonLabel position='floating'>Situação</IonLabel>
                        <IonSelect>
                            <IonSelectOption value='Disponível'>Disponível</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonGrid style={{ padding: 0 }}>
                        <IonCol style={{ padding: 0, display:'flex', justifyContent:'center'}}>
                            <IonButton style={{ padding: 10, marginTop: '4%', marginBottom:0 }}
                                type='submit'
                                shape='round'
                            > CADASTRAR
                            </IonButton>
                        </IonCol>
                    </IonGrid>

                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Register;