import { supabase } from '../../supabase';

// Define InventoryItem type within a namespace to avoid conflict
export namespace InventoryTypes {
  export type InventoryItem = {
    id: string;
    name: string;
    quantity: number;
    price: number;
    created_at?: string;
  };
}

export const addItem = async (item: Omit<InventoryTypes.InventoryItem, 'id'>): Promise<InventoryTypes.InventoryItem[]> => {
  const { data, error } = await supabase.from('inventory').insert([item]);
  if (error) {
    console.error('Error adding item:', error.message);
    return [];
  }
  return data ?? [];
};

export const fetchItems = async (): Promise<InventoryTypes.InventoryItem[]> => {
  const { data, error } = await supabase.from('inventory').select('*');
  if (error) {
    console.error('Error fetching items:', error.message);
    return [];
  }
  return data ?? [];
};

export const updateItem = async (
  id: string,
  updates: Partial<Omit<InventoryTypes.InventoryItem, 'id'>>
): Promise<InventoryTypes.InventoryItem[]> => {
  const { data, error } = await supabase.from('inventory').update(updates).eq('id', id);
  if (error) {
    console.error('Error updating item:', error.message);
    return [];
  }
  return data ?? [];
};

export const deleteItem = async (id: string): Promise<void> => {
  const { error } = await supabase.from('inventory').delete().eq('id', id);
  if (error) {
    console.error('Error deleting item:', error.message);
  }
};

