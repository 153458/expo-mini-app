import { StyleSheet } from 'react-native';

// styles made for the home page
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFBFBF',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#E8E8E8',
    padding: 20,
    borderRadius: 4,
    marginBottom: 24,
    elevation: 3,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#3B3B3B',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#3B3B3B',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});