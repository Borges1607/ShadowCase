<?php

use Symfony\Component\Finder\Finder;

/**
 * O conteúdo que resolve o jogo vive em app/Game/ e só sai do servidor no
 * momento certo. Estes testes vigiam essa fronteira.
 *
 * A varredura é feita no código-fonte do cliente, e não no HTML de uma rota:
 * as telas são renderizadas no navegador, então uma constante vazada apareceria
 * no bundle sem nunca passar por uma resposta HTTP.
 */

/** Tudo que, se conhecido de antemão, dispensa jogar. */
const PUZZLE_ANSWERS = [
    'PROCURE A CHAVE NO QUARTO 7',  // cifra de César
    'MEIA NOITE',                   // código morse
    'Sala do Cofre',                // mapa do crime
    'CHAVE',                        // anagrama, palavra 1
    'QUARTO',                       // anagrama, palavra 2
    'PROVA',                        // anagrama, palavra 3
    "D'Almeida",                    // a culpada
    'Lisboa',                       // epílogo
];

/** @return array<string, string> caminho relativo => conteúdo */
function clientSources(): array
{
    $files = (new Finder)
        ->files()
        ->in(resource_path('js'))
        ->name(['*.ts', '*.tsx']);

    $sources = [];

    foreach ($files as $file) {
        $sources[$file->getRelativePathname()] = $file->getContents();
    }

    return $sources;
}

it('encontra arquivos do cliente para varrer', function () {
    expect(clientSources())->not->toBeEmpty();
});

it('não deixa nenhuma resposta de puzzle vazar para o código do cliente', function () {
    foreach (clientSources() as $path => $contents) {
        foreach (PUZZLE_ANSWERS as $answer) {
            // assertStringNotContainsString aceita mensagem de verdade. O
            // toContain() do Pest trataria o segundo argumento como mais um
            // needle, e a asserção passaria mesmo com o vazamento presente.
            $this->assertStringNotContainsString(
                $answer,
                $contents,
                "'{$answer}' aparece em resources/js/{$path} — é resposta de puzzle e não pode ir para o cliente."
            );
        }
    }
});
