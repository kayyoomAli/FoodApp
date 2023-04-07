import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";

const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 }
];

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (item) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (index >= 0) {
      // If the item already exists in the cart, update the quantity
      const newCartItems = [...cartItems];
      newCartItems[index] = {
        ...newCartItems[index],
        quantity: newCartItems[index].quantity + 1
      };
      setCartItems(newCartItems);
    } else {
      // If the item doesn't exist in the cart, add it with a quantity of 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (item) => {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(newCartItems);
  };

  const handleIncreaseQuantity = (item) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (index >= 0) {
      const newCartItems = [...cartItems];
      newCartItems[index] = {
        ...newCartItems[index],
        quantity: newCartItems[index].quantity + 1
      };
      setCartItems(newCartItems);
    }
  };

  const handleDecreaseQuantity = (item) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (index >= 0) {
      const newCartItems = [...cartItems];
      if (newCartItems[index].quantity > 1) {
        newCartItems[index] = {
          ...newCartItems[index],
          quantity: newCartItems[index].quantity - 1
        };
      } else {
        newCartItems.splice(index, 1);
      }
      setCartItems(newCartItems);
    }
  };

  const renderProduct = ({ item }) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    const quantity = index >= 0 ? cartItems[index].quantity : 0;
    return (
      <View style={styles.productContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.cartButtonText}>
            {quantity > 0 ? `${quantity} in cart` : "Add to cart"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.cartItemContainer}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleDecreaseQuantity(item)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleIncreaseQuantity(item)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFromCart(item)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
      <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>Cart</Text>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
            contentContainerStyle={styles.cartContentContainer}
          />
        ) : (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        )}
      </View>
    </View>
  );
};
export default ProductList;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 10
    },
    searchContainer: {
      marginVertical: 10
    },
    searchInput: {
      backgroundColor: "#f2f2f2",
      padding: 10,
      borderRadius: 5
    },
    listContainer: {
      flex: 1,
      marginRight: 10
    },
    listContentContainer: {
      paddingBottom: 20
    },
    productContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#f2f2f2",
      paddingBottom: 10,
      marginBottom: 10
    },
    productName: {
      flex: 1,
      fontWeight: "bold"
    },
    productPrice: {
      fontWeight: "bold",
      marginLeft: 10
    },
    cartButton: {
      backgroundColor: "#007aff",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5
    },
    cartButtonText: {
      color: "#fff"
    },
    cartContainer: {
      width: 150,
      borderWidth: 1,
      borderColor: "#f2f2f2",
      borderRadius: 5,
      padding: 10
    },
    cartTitle: {
      fontWeight: "bold",
      marginBottom: 10
    },
    cartContentContainer: {
      flexGrow: 1
    },
    cartItemContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10
    },
    cartItemName: {
      flex: 1
    },
    quantityContainer: {
      flexDirection: "row",
      alignItems: "center"
    },
    quantityButton: {
      backgroundColor: "#f2f2f2",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5
    },
    quantityButtonText: {
      fontWeight: "bold"
    },
    quantityText: {
      marginHorizontal: 10
    },
    removeButton: {
      backgroundColor: "#ff3b30",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5
    },
    removeButtonText: {
      color: "#fff",
      fontWeight: "bold"
    },
    emptyCartText: {
      fontStyle: "italic"
    }
  });
  