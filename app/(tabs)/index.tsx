import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchItems, deleteItem } from '../backend/supabaseOperations';
import { InventoryTypes } from '../backend/supabaseOperations';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';  // Import useFocusEffect

const IndexScreen: React.FC = () => {
  const [items, setItems] = useState<InventoryTypes.InventoryItem[]>([]);
  const router = useRouter();

  // Function to fetch and update items
  const loadItems = async () => {
    const data = await fetchItems();
    setItems(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadItems();  // Reload items whenever the screen is focused
    }, [])
  );

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Wet the Spagh Igit</Text>

      <TouchableOpacity
        style={styles.addItemButton}
        onPress={() => router.push('/(tabs)/AddItemScreen')}
      >
        <Text style={styles.addItemButtonText}>Add Item</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemText}>
              <Text style={styles.itemName}>{item.name}</Text> {'\n'}
              <Text style={styles.itemDetail}>Quantity: {item.quantity} pcs</Text> {'\n'}
              <Text style={styles.itemDetail}>Price: ₱{item.price.toFixed(2)}</Text>
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',  // Light background color
  },
  welcomeText: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',  // Dark text color
  },
  addItemButton: {
    backgroundColor: '#201b51',  // USTP Blue
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  addItemButtonText: {
    color: '#fff',  // White text on blue button
    fontSize: 18,
  },
  itemCard: {
    backgroundColor: '#fff',  // White background for items
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',  // Dark text for items
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#201b51',  // USTP Blue for item name
  },
  itemDetail: {
    fontSize: 16,
    color: '#333',  // Dark text for details
  },
  deleteButton: {
    backgroundColor: '#fdb813',  // USTP Yellow
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',  // White text on yellow button
    fontSize: 14,
  },
});

export default IndexScreen;
