import React, { useMemo } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from "../../hooks";
import moment from "moment";
import groupBy from "lodash/groupBy";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../screenNames";

const Favourite = (props) => {
  const { } = props;
  const users = useAppSelector(state => state.users);
  const navigation = useNavigation();

  const favouriteBlogs = useMemo(() => {
    return groupBy(users.favoriteBlogs, "postedDate");
  }, [users]);

  const favouriteBusinesses = useMemo(() => {
    return groupBy(users.favoriteBusinesses, "dateCreated");
  }, [users]);

  const favourites = useMemo(() => {
    return groupBy(users.favorites, "_date");
  }, []);

  const onPress = (type, id) => {
    switch (type) {
      case "blog":
        navigation.navigate(screenNames.ProfileBlogScreen, { id });
        break;
      case "business":
        navigation.navigate(screenNames.ProfileBusinessScreen, { id });
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
      <Text style={styles.headerText}>Your Favourites</Text>
      {
        Object.entries(favourites).map((fav, bIndex) => (
          <View key={bIndex + "bIndex"}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="time" size={22} color="gray" />
              <Text style={styles.timelineTitle}>
                {moment(fav[0]).format('MMMM Do YYYY')}
              </Text>
            </View>
            {fav[1].map((item, bFavIndex) => (
              <TouchableOpacity
                key={bFavIndex + "bFavIndex"}
                style={{ flexDirection: "row" }}
                activeOpacity={0.9}
                onPress={() => onPress(item.type, item.id)}
              >
                <View style={{ borderLeftWidth: 2, borderLeftColor: "gray", marginHorizontal: 10 }} />
                <View style={styles.card} >
                  <View style={styles.iconWrapper}>
                    <Ionicons name={item.type === "blog" ? "newspaper" : "business"} size={35} color="#FFFFFF" />
                  </View>

                  <View style={{ justifyContent: "center" }}>
                    <Text style={styles.title} numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  card: {
    flex: 1,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 5,
    marginTop: 15
  },
  iconWrapper: {
    width: '25%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#046d76',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: "#046d76",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10
  },
  title: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#046d76',
  },
  tagsText: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#046d76',
  },
  timelineTitle: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10
  },
});

export default Favourite;
