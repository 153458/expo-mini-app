import { StyleSheet } from 'react-native';

// styles for the first alternative page
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFBFBF',
  },
  header: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#E8E8E8',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    backgroundColor: '#E8E8E8',
    padding: 20,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    height: 100,
    textAlignVertical: 'top',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E8E8E8',
    padding: 20,
    marginTop: 8,
  },
});