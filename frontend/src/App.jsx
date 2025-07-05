import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Progress,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Checkbox,
  CheckboxGroup,
  Stack,
  Divider,
  Grid,
  GridItem,
  useColorModeValue,
  useToast,
  IconButton,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, InfoIcon } from '@chakra-ui/icons'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5001'

function App() {
  const [texts, setTexts] = useState(['', ''])
  const [threshold, setThreshold] = useState(0.8)
  const [selectedModels, setSelectedModels] = useState(['all-MiniLM-L6-v2'])
  const [availableModels, setAvailableModels] = useState([])
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    fetchAvailableModels()
  }, [])

  const fetchAvailableModels = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/models`)
      setAvailableModels(response.data.models)
    } catch (err) {
      console.error('Failed to fetch models:', err)
    }
  }

  const addTextBox = () => {
    setTexts([...texts, ''])
  }

  const removeTextBox = (index) => {
    if (texts.length > 2) {
      const newTexts = texts.filter((_, i) => i !== index)
      setTexts(newTexts)
    }
  }

  const updateText = (index, value) => {
    const newTexts = [...texts]
    newTexts[index] = value
    setTexts(newTexts)
  }

  const analyzePlagiarism = async () => {
    if (texts.filter(t => t.trim()).length < 2) {
      toast({
        title: 'Error',
        description: 'Please provide at least 2 non-empty texts to analyze',
        status: 'error',
        duration: 3000,
      })
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/analyze`, {
        texts: texts.filter(t => t.trim()),
        threshold,
        models: selectedModels
      })
      
      setResults(response.data)
      toast({
        title: 'Analysis Complete',
        description: 'Plagiarism analysis completed successfully',
        status: 'success',
        duration: 3000,
      })
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed')
      toast({
        title: 'Error',
        description: err.response?.data?.error || 'Analysis failed',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  const getSimilarityColor = (similarity) => {
    if (similarity >= 0.8) return 'red.500'
    if (similarity >= 0.6) return 'orange.500'
    if (similarity >= 0.4) return 'yellow.500'
    return 'green.500'
  }

  const getSimilarityLabel = (similarity) => {
    if (similarity >= 0.8) return 'High Risk'
    if (similarity >= 0.6) return 'Medium Risk'
    if (similarity >= 0.4) return 'Low Risk'
    return 'Safe'
  }

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="brand.600">
              Plagiarism Detector
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Semantic Similarity Analyzer using Advanced AI Models
            </Text>
          </VStack>

          {/* Configuration Panel */}
          <Card bg={cardBg} shadow="md">
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md">Configuration</Heading>
                <IconButton
                  icon={<InfoIcon />}
                  variant="ghost"
                  onClick={onOpen}
                  aria-label="Info"
                />
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={6}>
                {/* Model Selection */}
                <Box w="100%">
                  <Text fontWeight="semibold" mb={2}>
                    Select Models:
                  </Text>
                  <CheckboxGroup value={selectedModels} onChange={setSelectedModels}>
                    <Stack direction="row" flexWrap="wrap" spacing={4}>
                      {availableModels.map(model => (
                        <Checkbox key={model.name} value={model.name}>
                          <Tooltip label={model.description} placement="top">
                            <Text>{model.name}</Text>
                          </Tooltip>
                        </Checkbox>
                      ))}
                    </Stack>
                  </CheckboxGroup>
                </Box>

                {/* Threshold Setting */}
                <Box w="100%">
                  <Text fontWeight="semibold" mb={2}>
                    Similarity Threshold: {Math.round(threshold * 100)}%
                  </Text>
                  <Slider
                    value={threshold}
                    onChange={setThreshold}
                    min={0.1}
                    max={1.0}
                    step={0.05}
                    colorScheme="brand"
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    Texts with similarity above this threshold will be flagged as potential plagiarism
                  </Text>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          {/* Text Input Section */}
          <Card bg={cardBg} shadow="md">
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md">Text Input</Heading>
                <Button
                  leftIcon={<AddIcon />}
                  onClick={addTextBox}
                  colorScheme="brand"
                  size="sm"
                >
                  Add Text
                </Button>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                {texts.map((text, index) => (
                  <Box key={index} w="100%">
                    <HStack mb={2}>
                      <Text fontWeight="semibold">
                        Text {index + 1}:
                      </Text>
                      {texts.length > 2 && (
                        <IconButton
                          icon={<DeleteIcon />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => removeTextBox(index)}
                          aria-label="Remove text"
                        />
                      )}
                    </HStack>
                    <Textarea
                      value={text}
                      onChange={(e) => updateText(index, e.target.value)}
                      placeholder={`Enter text ${index + 1} here...`}
                      rows={6}
                      resize="vertical"
                    />
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>

          {/* Analyze Button */}
          <Button
            onClick={analyzePlagiarism}
            isLoading={loading}
            loadingText="Analyzing..."
            colorScheme="brand"
            size="lg"
            isDisabled={texts.filter(t => t.trim()).length < 2}
          >
            Analyze Plagiarism
          </Button>

          {/* Error Display */}
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Results Section */}
          {results && (
            <Card bg={cardBg} shadow="md">
              <CardHeader>
                <Heading size="md">Analysis Results</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={6} align="stretch">
                  {Object.entries(results.results).map(([modelName, result]) => (
                    <Box key={modelName}>
                      <VStack spacing={4} align="stretch">
                        <HStack justify="space-between">
                          <Heading size="sm" color="brand.600">
                            {modelName}
                          </Heading>
                          <Badge colorScheme="gray">
                            {result.processing_time}s
                          </Badge>
                        </HStack>

                        {/* Clone Detection */}
                        {result.clones.length > 0 ? (
                          <Alert status="warning">
                            <AlertIcon />
                            <AlertTitle>Potential Plagiarism Detected!</AlertTitle>
                            <AlertDescription>
                              {result.clones.length} text pair(s) exceeded the similarity threshold ({Math.round(result.threshold * 100)}%)
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <Alert status="success">
                            <AlertIcon />
                            <AlertTitle>No Plagiarism Detected</AlertTitle>
                            <AlertDescription>
                              No text pairs exceeded the {Math.round(result.threshold * 100)}% similarity threshold
                            </AlertDescription>
                          </Alert>
                        )}

                        {/* Similarity Matrix */}
                        <Box>
                          <Text fontWeight="semibold" mb={2}>
                            Similarity Matrix:
                          </Text>
                          <TableContainer>
                            <Table size="sm">
                              <Thead>
                                <Tr>
                                  <Th></Th>
                                  {results.texts.map((_, index) => (
                                    <Th key={index} textAlign="center">
                                      Text {index + 1}
                                    </Th>
                                  ))}
                                </Tr>
                              </Thead>
                              <Tbody>
                                {result.similarity_matrix.map((row, i) => (
                                  <Tr key={i}>
                                    <Td fontWeight="semibold">Text {i + 1}</Td>
                                    {row.map((similarity, j) => (
                                      <Td key={j} textAlign="center">
                                        <Badge
                                          colorScheme={
                                            i === j ? 'gray' : 
                                            similarity >= threshold ? 'red' : 'green'
                                          }
                                        >
                                          {Math.round(similarity * 100)}%
                                        </Badge>
                                      </Td>
                                    ))}
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </Box>

                        {/* Detected Clones or Summary */}
                        {result.clones.length > 0 ? (
                          <Box>
                            <Text fontWeight="semibold" mb={2}>
                              Detected Clones:
                            </Text>
                            <VStack spacing={2}>
                              {result.clones.map((clone, index) => (
                                <Alert key={index} status="error">
                                  <AlertIcon />
                                  <AlertDescription>
                                    <Text>
                                      <strong>Text {clone.text1_index + 1}</strong> and{' '}
                                      <strong>Text {clone.text2_index + 1}</strong> are{' '}
                                      <strong>{Math.round(clone.similarity * 100)}%</strong> similar
                                    </Text>
                                  </AlertDescription>
                                </Alert>
                              ))}
                            </VStack>
                          </Box>
                        ) : (
                          <Box>
                            <Text fontWeight="semibold" mb={2}>
                              Similarity Summary:
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              Highest similarity: <strong>
                                {Math.round(Math.max(...result.similarity_matrix.flat().filter((val, idx, arr) => 
                                  arr.indexOf(val) !== idx || val < 1)) * 100)}%
                              </strong> (below {Math.round(result.threshold * 100)}% threshold)
                            </Text>
                          </Box>
                        )}
                      </VStack>
                      {Object.keys(results.results).length > 1 && <Divider mt={6} />}
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          )}
        </VStack>
      </Container>

      {/* Info Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How it Works</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Text>
                <strong>Semantic Similarity Analysis:</strong> This tool uses advanced AI models 
                to detect plagiarism by analyzing the semantic meaning of texts, not just exact word matches.
              </Text>
              
              <Text>
                <strong>Embedding Models:</strong>
              </Text>
              <VStack spacing={2} align="stretch" pl={4}>
                <Text>• <strong>all-MiniLM-L6-v2:</strong> Fast and efficient for general-purpose similarity</Text>
                <Text>• <strong>paraphrase-MiniLM-L6-v2:</strong> Optimized for paraphrase detection</Text>
                <Text>• <strong>all-mpnet-base-v2:</strong> Higher quality embeddings, more accurate but slower</Text>
              </VStack>

              <Text>
                <strong>Similarity Threshold:</strong> Adjust the threshold to control sensitivity. 
                Higher values (80-90%) catch only very similar texts, while lower values (60-70%) 
                are more sensitive to potential plagiarism.
              </Text>

              <Text>
                <strong>How to Use:</strong>
              </Text>
              <VStack spacing={1} align="stretch" pl={4}>
                <Text>1. Select one or more embedding models</Text>
                <Text>2. Set your similarity threshold</Text>
                <Text>3. Add texts to compare (minimum 2)</Text>
                <Text>4. Click "Analyze Plagiarism"</Text>
                <Text>5. Review the similarity matrix and detected clones</Text>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default App 