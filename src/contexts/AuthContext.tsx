import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../interfaces';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface AuthContextInterface {
  user: User | null;
  login: any;
  logout: any;
}
interface Data extends User {
  token: string;
}

const AuthContext = React.createContext({} as AuthContextInterface);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const checkAuth = async () => {
    const item = await AsyncStorage.getItem('user');
    if (item) {
      const data = JSON.parse(item);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
      setUser({ _id: data._id, phone: data.phone });
    }
    setAuthReady(true);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (data: Data) => {
    setUser({ _id: data._id, phone: data.phone });
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
    AsyncStorage.setItem('user', JSON.stringify(data));
  };

  const logout = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ';
    setUser(null);
    AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
      }}
    >
      {authReady && children}
      {!authReady && (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      )}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const useAuth = () => React.useContext(AuthContext);
