import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addItem } from '../backend/supabaseOperations';

const AddItemScreen: React.FC = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAddItem = async () => {
    if (!name || !quantity || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const item = {
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };

    try {
      const newItem = await addItem(item);
      console.log(newItem);  // Log to check if the item was added successfully
      if (newItem.length > 0) {
        Alert.alert('Success', 'Item added successfully!');
        // Clear the fields after a short delay to allow the UI to update
        setTimeout(() => {
          setName('');
          setQuantity('');
          setPrice('');
          navigation.goBack();
        }, 100);  // Slight delay before clearing fields
      }
    } catch (error) {
      Alert.alert('Error', 'There was an issue adding the item.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <Button title="Add Item" onPress={handleAddItem} color="#fdb813" /> {/* USTP Yellow Button */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',  // Light background color
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#201b51',  // USTP Blue for title text
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',  // Light gray border
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',  // White input fields
  },
});

export default AddItemScreen;
