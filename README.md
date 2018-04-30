<!-- TOC -->

- [Opis projektu](#opis-projektu)
- [Organizacja pracy](#organizacja-pracy)
    - [Gałęzie projektu](#gałęzie-projektu)
    - [Obsługa Git'a dla mniej wtajemniczonych](#obsługa-gita-dla-mniej-wtajemniczonych)
- [Prototyp aplikacji](#prototyp-aplikacji)
    - [Schemat działania aplikacji](#schemat-działania-aplikacji)
    - [Struktura aplikacji](#struktura-aplikacji)
    - [Struktura bazy danych](#struktura-bazy-danych)
- [Dokumentacja aplikacji](#dokumentacja-aplikacji)
    - [Wykorzystane technologie](#wykorzystane-technologie)
    - [Konfiguracja](#konfiguracja)
    - [Instalacja](#instalacja)
    - [Instrukcja działania](#instrukcja-działania)
- [Autorzy](#autorzy)
- [Raport prac](#raport-prac)

<!-- /TOC -->
## Opis projektu

Aplikacja, która małymi kroczkami wspomaga codzienną pracę nad sobą, pomagając wyrobić w sobie przydatne nawyki oraz wygasić te niechciane. Codziennie o określonej, wcześniej w aplikacji, porze przychodzi powiadomienie, gdzie należy odpowiedzieć czy udało się zaliczyć daną czynność/zadanie (każde z osobna). Po wszystkich odpowiedziach wyświetlane jest podsumowanie, które prezentowane będzie w postaci licznika passy, % wykonanych czynności w danym miesiącu oraz kolorowych miesięcznych wykresów. Użytkownik aplikacji może dodawać własne, edytować, usuwać oraz przypisywać sugerowane, przez autorów aplikacji, zadania. Z aplikacji można skorzystać po zalogowaniu (przy użyciu kont społecznościowych oraz tradycyjnie) ale także w pewnym zakresie w trybie offline. 

Typy czynności możliwe do dodania i śledzenia znajdują się poniżej.

* "Yes/No" np. dzień bez alkoholu, gdzie odpowiedzią jest wartość logiczna
* "Z inputem" np. 30min nauki dziennie, gdzie należy podać wartość liczbową co oznacza, że czynność można wykonać cząstkowo
* Informacja np. jakiś ładny cytat, pełni rolę przypominajki
* Mini słownik np. słówka polsko-angielskie dotyczące ekonomii, losowana jest codziennie, najlepiej bez powtórzeń, oraz wyświetlana tabela zawierająca n słówek

## Organizacja pracy

### Gałęzie projektu

* **[master](/uek-pro/bai-project/tree/master)** - Główna gałąź aplikacji. **Commity dodawane wyłącznie poprzez pull request** (wytłumaczone poniżej).
* **[gh-pages](/uek-pro/bai-project/tree/gh-pages)** - Gałąź z dokumentacją. Commity dodawane dowolnie.
* **b-*numer\_issue*** - Gałęzie dodające nowe funkcjonalności lub rozwiązujące problemy o ientyfikatorze issue podanym w nazwie gałęzi.
* ***dowolna\_nazwa*** - Dodatkowe gałęzie wspomagające tworzenie aplikacji.

1. **Nie usuwamy branchy**, które zostały już zmergowane. 
1. Gałęzie można tworzyć do woli i jest to nawet wskazane.

### Obsługa Git'a dla mniej wtajemniczonych

```bash
git clone https://github.com/uek-pro/bai-project.git
git checkout -b nazwa_brancha   # Utworzenie brancha o podanej nazwie i przejście do niego
# zmiany.. zmiany..                                       
git add *                       # Dodanie wszystkich zmienionych plików do commita
git commit -m "Commit title"    # Utworzenie commita (pamiętać: tytuł wielką literą i po angielsku)
git push origin nazwa_brancha   # Wysłanie brancha do repozytorium na GitHubie
```

Niezależnie od tego czy problem został rozwiązany czy jest to dopiero początek rozwiązania, pasowałoby utworzyć Pull request. Na [stronie z tworzeniem nowych Pull requestów](https://github.com/uek-pro/bai-project/compare) należy, wybrać w miejscu _compare_ nazwe brancha, nad którym pracowaliśmy, wcisnąć przycisk Create pull request, a następnie uzupełnić pola treścią oraz zatwierdzić. Kolejne wypychane commity automatycznie dodawane są do utworzonego wcześniej pull requesta.

Z czasem gdy na branchu master projekt bardziej się posunie niż mamy go u siebie lokalnie, wymagana jest synchronizacja 

```bash
git fetch
git pull origin master
```

## Prototyp aplikacji

### Schemat działania aplikacji

### Struktura aplikacji

### Struktura bazy danych

## Dokumentacja aplikacji

### Wykorzystane technologie

### Konfiguracja

### Instalacja

### Instrukcja działania

## Autorzy

<table class="authors" style="text-align:center">
    <tr>
      <td>
        <a href="https://github.com/adamusdaniel">
            <img width="120" height="120"
        src="https://avatars1.githubusercontent.com/u/23094478?v=4">
        </a>
        <p>Daniel</p>
      </td>
      <td>
        <a href="https://github.com/danbraj">
            <img width="120" height="120"
        src="https://avatars3.githubusercontent.com/u/19363013?v=4">
        </a>
        <p>Daniel <span>(kierownik)</span></p>
      </td>
      <td>
        <a href="https://github.com/insomnia1337">
            <img width="120" height="120"
        src="https://avatars1.githubusercontent.com/u/23103157?v=4">
        </a>
        <p>Mateusz</p>
      </td>
      <td>
        <a href="https://github.com/EmSiii">
            <img width="120" height="120"
        src="https://avatars1.githubusercontent.com/u/22874596?v=4">
        </a>
        <p>Michał</p>
      </td>
    </tr>
</table>

## Raport prac
| Zadanie | Daniel | Daniel (k) | Mateusz | Michał |
| ---------------- | -: | -: | -: | -: |
| Zadanie 1        |  2 |  3 |  2 |  1 |
| Zadanie 2        |  2 |  1 |  1 |  1 |
| Zadanie 3        |  1 |  1 |  1 |  2 |
| Zadanie 4        |  1 |  2 |  3 |  2 |
| **Podsumowanie** |**6**|**7**|**7**|**6**|

![Practice Control](https://raw.githubusercontent.com/uek-pro/bai-project/master/src/img/logo.svg?sanitize=true)