import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  return (
    <>
      {/* Top colored bar */}
      <View style={styles.topBar} />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#fdb813', // USTP Yellow for active tab
          tabBarInactiveTintColor: '#ffffff', // White for inactive tabs
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: { position: 'absolute' },
            default: {
              backgroundColor: '#201b51', // USTP Blue background for the tab bar
              borderTopColor: '#fdb813', // USTP Yellow border on top
              borderTopWidth: 1, // Fixed the missing value for borderTopWidth
            },
          }),
        }}
      >
        {/* Index Screen Tab (Home) */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />

        {/* Add Item Screen Tab */}
        <Tabs.Screen
          name="AddItemScreen"
          options={{
            title: 'Add Item',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    height: 40, // You can adjust the height of the bar
    backgroundColor: '#201b51', // USTP Blue color
    borderBottomWidth: 1,
    borderBottomColor: '#201b51', // USTP Yellow border
  },
});
