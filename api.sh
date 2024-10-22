#!/bin/bash
# Para rodar este script, use o comando: bash api.sh

# Exibe uma saudação na saída
echo "SH para download de todos os recursos da api 5e, funciona, mas nao foi a maneira mais esperta de ter feito o servico :p"

# Declara um array chamado 'resources' contendo diferentes categorias da API
resources=( 
    "ability-scores"
    "alignments" 
    "backgrounds"
    "classes"
    "conditions"
    "damage-types"
    "equipment"
    "equipment-categories"
    "feats"
    "features"
    "languages"
    "magic-items"
    "magic-schools"
    "monsters"
    "proficiencies"
    "races"
    "rule-sections"
    "rules"
    "skills"
    "spells"
    "subclasses"
    "subraces"
    "traits"
    "weapon-properties"
)

# Obtém o número de elementos no array 'resources'
resourcesSize=${#resources[@]}

# Loop através de cada recurso no array
for ((i=0; i<resourcesSize; i++))
do
    # Inicializa a variável 'content' com a declaração de exportação para um array TypeScript
    content="export const ${resources[$i]} = ["

    # Faz uma requisição para a API usando curl para obter dados do recurso atual
    req=$(curl -L "https://www.dnd5eapi.co/api/${resources[$i]}" -H 'Accept: application/json')

    # Extrai os índices dos resultados retornados pela API usando jq
    indexes=($(echo "$req" | jq -r '.results[].index'))

    # Exibe o nome do recurso atual na saída
    echo ${resources[i]}

    # Exibe os índices extraídos
    echo ${indexes[@]}

    # Loop através de cada índice encontrado
    for index in "${indexes[@]}"; do
        # Faz uma nova requisição para a API para obter dados detalhados para o índice atual
        req2=$(curl -L "https://www.dnd5eapi.co/api/${resources[$i]}/${index}" -H 'Accept: application/json')

        # Adiciona o resultado da requisição ao conteúdo, com uma quebra de linha
        content+="${req2},\n"
    done

    # Fecha a declaração do array TypeScript
    content+="]"

    # Exibe um separador para melhor visualização
    echo "============================"

    # Cria um arquivo TypeScript na pasta 'apidata' com o nome do recurso e escreve o conteúdo gerado
    echo -e $content > ./apidata/${resources[$i]}.ts
done
