import ActivityCard from "@/components/ActivityCard";
import AppHeader from "@/components/AppHeader";
import CenteredModal from "@/components/CenteredModal";
import { DefaultButton } from "@/components/DefaultButton";
import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import { useShipmentStore } from "@/store/remessasContext";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowRightLeft,
  ChevronDown,
  Cylinder,
  Grape,
  Microscope,
  Milk,
  TestTubeDiagonal,
  Pencil,
  X,
} from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Tank() {
  const { tank, depositId, content, contentId } = useLocalSearchParams();
  const router = useRouter();
  const { clearShipments } = useShipmentStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      clearShipments();
      return;
    }, [])
  );
  let activityListItems = [
    {
      name: "Análises diárias",
      icon: <Cylinder size="28px" color="#000000" />,
      route: "/(tankControl)/tank/dailyAnalysis/[dailyAnalysis]",
      //type: "tank",
      param: [
        {
          tank: tank as string,
          depositId: Number(depositId),
          content: content,
          contentId: contentId,
        },
      ],
    },
    {
      name: "Análises de deposito",
      icon: <Microscope size="28px" color="#000000" />,
      route: "/(tankControl)/tank/depositAnalysis/listAnalysis/[listAnalysis]",
      //type: "tank",
      param: [{ tank: tank as string, depositId: Number(depositId) }],
    },
    {
      name: "Envase e rotulagem",
      icon: <Milk size="28px" color="#000000" />,
      route: "/envaseERotulagem/envase",
      //type: "tank",
      param: [{ tank: tank as string, depositId: Number(depositId) }],
    },
    {
      name: "Adicionar Vinho Base",
      icon: <Grape size="28px" color="#000000" />,
      route: "/(tankControl)/tank/addBaseWine/[addBaseWine]",
      //type: "tank",
      param: [{ tank: tank as string, depositId: Number(depositId) }],
    },
    {
      name: "Realizar Trasfega",
      icon: <ArrowRightLeft size="28px" color="#000000" />,
      route: "/(tankControl)/tank/realizarTrasfega/[trasfega]",
      //type: "",
      param: [{ tank: tank as string, depositId: Number(depositId) }],
    },
    {
      name: "Controle de produtos",
      icon: <TestTubeDiagonal size="28px" color="#000000" />,
      route: "/(tankControl)/tank/addProduct/[addProduct]",
      //type: "tank",
      param: [
        {
          tank: tank as string,
          contentId: contentId,
        },
      ],
    },
  ];
  function filterActivityItems() {
    if (content !== "Vinho" && content !== "Pé de Cuba") {
      return activityListItems.filter((i) => i.name !== "Controle de produtos");
    }
    return activityListItems;
  }
  return (
    <SafeAreaView>
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText={`${tank}`}
        returnHref={router.back}
      />
      <View>
        <View className="flex flex-row justify-between px-7 items-center mb-4">
          <Text className="text-zinc-950 font-bold text-2xl">Ações</Text>
            <View className="flex flex-row justify-between items-center gap-4 border p-2 bg-white" 
              onTouchStart={()=> setIsDialogOpen(true)}
            >
              <Text className="text-blue-500">Editar Tanque</Text>
              <Pencil
                size="25px"
                color="black"
              />
            </View>
            <CenteredModal
              isDialogOpen={isDialogOpen}
              handleDialogClose={() => setIsDialogOpen(false)}
            >
              <View className="px-6 py-10 bg-white rounded-xl relative">
                <X
                  style={{ position: 'absolute', top: 16, right: 16  }}
                  size={35}
                  color="black"
                  onPress={() => setIsDialogOpen(false)}
                />
                <Text className="text-xl mt-8 mb-4">
                  Alterações que podem ser feitas no tanque
                </Text>
                <View className="gap-8">
                  <InputBox
                    title="Editar Volume"
                    placeholder="500 (Aqui virá o volume atual)"
                  >
                    <Text className="text-xl">L</Text>
                  </InputBox>
                  <DefaultButton title="Concluir" onPress={()=> null} />
                </View>
              </View>
            </CenteredModal>
        </View>
        <FlatList
          data={filterActivityItems()}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return (
              <ActivityCard
                title={item.name}
                icon={item.icon}
                route={item.route}
                //type={item.type}
                param={item.param}
              />
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 25,
            gap: 10,
          }}
        />
      </View>
      <View className="px-7 gap-4">
        <View>
          <Text className="text-2xl">Remessas associadas</Text>
          <Card />
        </View>
        <CardNotEmpty />
      </View>
    </SafeAreaView>
  );
}

const Card = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.subtitle}>Última remessa associada</Text>
      <View style={styles.row}>
        <Text style={styles.shipment}>101 - 2º Talão</Text>
        <Text style={styles.details}>Detalhes</Text>
      </View>
    </View>
  );
};

const CardNotEmpty = () => {
  return (
    <View>
      <Text className="text-2xl font-medium">Resumo da última análise</Text>
      <View className="bg-white" style={styles.card}>
        <Text className="text-xl text-black font-medium">09/08/24</Text>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Densidade</Text>
          <View style={styles.bottomAligned}>
            <Text className="text-xl">996</Text>
            <Text className="text-gray-500">g/cm3</Text>
          </View>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Temperatura</Text>
          <View style={styles.bottomAligned}>
            <ChevronDown size="25px" color="red" />
            <Text className="text-xl">20</Text>
            <Text className="text-gray-500">ºC</Text>
          </View>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Pressão</Text>
          <View style={styles.bottomAligned}>
            <ChevronDown
              size="25px"
              color="green"
              style={{
                transform: [{ rotate: "180deg" }],
              }}
            />
            <Text className="text-xl">5.7</Text>
            <Text className="text-gray-500">bar</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 8,
  },
  subtitle: {
    color: "gray",
    fontSize: 12,
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shipment: {
    fontSize: 16,
  },
  details: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "blue",
  },
  bottomAligned: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4, // Use this if gap is not supported, otherwise you can remove it
  },
});
