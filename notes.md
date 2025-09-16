# Notas e Comandos Úteis para o Projeto Expo / React Native

## Expo CLI - Desenvolvimento Local
- Criar projeto Expo com template em TypeScript:  
  `npx create-expo-app my-fitness-app --template blank`

- Iniciar servidor de desenvolvimento:  
  `npx expo start`

- Iniciar com limpeza de cache (resolver problemas comuns):  
  `npx expo start -c`

- Rodar no dispositivo via QR code com Expo Go:  
  Escaneie o QR code com app Expo Go (disponível para iOS e Android)

## Dependências e Pacotes
- Verificar dependências desatualizadas:  
  `npm outdated`

- Atualizar todas dependências para versões compatíveis:  
  `npm update`

- Instalar pacote específico com versão definida:  
  `npm install pacote@versão`

- Instalar dependências de navegação Expo:  
  `npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack`
  `npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-get-random-values`

text

## Build e Deploy
- Gerar build para iOS e Android com Expo (utilizar contas Expo):  
`eas build --platform ios`  
`eas build --platform android`  

- Publicar app OTA (over-the-air) atualizações:  
`expo publish`

- Visualizar status e histórico de builds e publicações:  
`eas build:list`  
`expo publish:history`

## Dicas Úteis
- Sempre usar `npx expo start -c` para limpar cache quando houver problemas de build / atualização

- Documentar componentes reutilizáveis para garantir consistência

- Usar AsyncStorage para dados locais simples; migrar para backend ou SQLite conforme escala

- Testar a app em dispositivos reais frequentemente (iOS e Android)

- Usar bibliotecas mantidas e compatíveis com Expo (ver docs para versões suportadas)

## Comandos Gerais NPM
- Iniciar instalação de dependências (após clonar o projeto):  
`npm install`

- Ver versão do Node:  
`node -v`

- Ver versão do npm:  
`npm -v`

- Executar testes (caso aplicável):  
`npm test`

---

*Atualize este arquivo conforme evolução do projeto e novas descobertas!*