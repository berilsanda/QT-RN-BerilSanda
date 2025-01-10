import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Buttons from '@/components/Buttons';
import Modals from '@/components/Modals';
import TextInputs from '@/components/TextInputs';
import { colors, typography } from '@/config/Constants';
import { completeTransaction } from '@/features/transaction/stores/TransactionSlice';
import { useAppDispatch, useAppSelector } from '@/hook/UseRedux';
import { CartStackParamList } from '@/navigations/types/CartNavigatorTypes';
import { formatPrice } from '@/utils/FormatPrice';

export default function Payment({
  navigation,
  route: { params },
}: NativeStackScreenProps<CartStackParamList, 'Payment'>) {
  const dispatch = useAppDispatch();
  const cartList = useAppSelector((state) => state.cart.cartList);
  const [modalVisible, setModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [errorInput, setErrorInput] = useState('');

  // Text passed on text input
  // should be number only
  // and limited to 10 number only
  function handleOnChangeText(text: string) {
    if (errorInput.length > 0) {
      setErrorInput('');
    }

    const formatText = text.replace(/[^0-9]/g, '');
    if (formatText.length <= 10) {
      setCardNumber(formatText);
    }
  }

  function resetModal() {
    setCardNumber('');
    setModalVisible(false);
  }

  function onCash() {
    dispatch(
      completeTransaction({
        productList: cartList,
        totalPrice: params.totalPrice,
      }),
    );

    navigation.goBack();
  }

  function onCard() {
    if (cardNumber.length < 10) {
      setErrorInput('Nomor kartu minimal 10 angka');
      return;
    }

    resetModal();
    onCash();
  }

  return (
    <View style={styles.container}>
      <Text style={[typography['heading1'], { textAlign: 'center' }]}>
        Total Pembayaran
      </Text>
      <Text
        style={[
          typography['heading2'],
          { textAlign: 'center', color: colors.primary },
        ]}
      >
        {formatPrice(params.totalPrice)}
      </Text>

      <View style={styles.buttonContainer}>
        <Buttons
          mode="outlined"
          label="Cash"
          onPress={onCash}
          style={{ flex: 1, marginRight: 16 }}
        />
        <Buttons
          label="Card"
          onPress={() => setModalVisible(true)}
          style={{ flex: 1 }}
        />
      </View>

      <Modals
        visible={modalVisible}
        onDismiss={() => resetModal()}
        style={{ paddingHorizontal: 20 }}
      >
        <View style={styles.modalContainer}>
          <Text style={[typography['label2'], { textAlign: 'center' }]}>
            Masukkan nomor kartu
          </Text>
          <TextInputs
            value={cardNumber?.toString() || ''}
            placeholder="Masukkan nomor kartu anda"
            onChangeText={handleOnChangeText}
            style={{ marginVertical: 16 }}
            keyboardType="numeric"
            error={errorInput}
          />
          <Buttons label="Bayar" onPress={onCard} />
        </View>
      </Modals>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  buttonContainer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.surface,
    borderRadius: 4,
    marginHorizontal: 20,
    padding: 8,
    width: '100%',
  },
});
