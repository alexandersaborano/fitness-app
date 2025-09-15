// Estilos globais para o aplicativo de fitness
import { StyleSheet } from "react-native";
import { colors, spacing, fontSizes } from "./theme";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    fontSize: fontSizes.xlarge,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontSizes.large,
    color: colors.muted,
    marginBottom: spacing.sm,
  },
  text: {
    fontSize: fontSizes.normal,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});
