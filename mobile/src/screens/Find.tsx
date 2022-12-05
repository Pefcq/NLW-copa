import { Heading, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState } from "react";

export function Find(){

    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    async function handleJoinPool(){

        try {
            setIsLoading(true)
        } catch (error) {
            console.log(error);

            if(error.response?.data?.message === 'Pool not found.'){
                toast.show({
                title: 'Bolão não encontrado',
                placement: 'top',
                bgColor : 'red.500'
                })
            }

            if(error.response?.data?.message === 'You already joined this pool.'){
                toast.show({
                title: 'Você já está dentro do bolão',
                placement: 'top',
                bgColor : 'red.500'
                })
            }
            
        }finally{
            setIsLoading(false)
        }
    }

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title = "Buscar por código" showBackButton/>

            <VStack mt={8} mx={5} alignItems="center">

                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Encontre um bolão através de seu código único
                </Heading>

                <Input mb={2} placeholder="Qual o código do bolão?"/>

                <Button title="BUSCAR BOLÃO" isLoading={isLoading} onPress={handleJoinPool}/>

            </VStack>
        </VStack>
    );
}