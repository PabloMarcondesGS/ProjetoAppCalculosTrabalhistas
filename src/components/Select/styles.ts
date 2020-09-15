import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular',
  },
  select: {
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4
  },
  error: {
    color: '#BF1650',
    fontFamily: 'Poppins_400Regular',
  }
});

export const pickerSelectStyles = (hasError: boolean) => StyleSheet.create({
  inputIOS: {
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: hasError ? "#BF1650" : "transparent",
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4
  },
  inputAndroid: {
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: hasError ? "#BF1650" : "transparent",
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4
  },
});

export default styles;