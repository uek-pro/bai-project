<!-- TOC -->

- [Opis projektu](#opis-projektu)
- [Organizacja pracy](#organizacja-pracy)
    - [Zarządzanie projektem](#zarządzanie-projektem)
    - [Gałęzie projektu](#gałęzie-projektu)
    - [Obsługa Git'a dla mniej wtajemniczonych](#obsługa-gita-dla-mniej-wtajemniczonych)
- [Prototyp aplikacji](#prototyp-aplikacji)
    - [Struktura aplikacji](#struktura-aplikacji)
- [Skład zespołu projektowego](#skład-zespołu-projektowego)
- [Raport prac](#raport-prac)

<!-- /TOC -->

## TL;DR

* Prototyp: [link](https://8h4b8u.axshare.com)
* Zarządzanie projektem: [link](https://app.zenhub.com/workspace/o/uek-pro/bai-project/) ew. [link](https://github.com/uek-pro/bai-project/issues?page=1&q=-label%3Aduplicate&utf8=%E2%9C%93)
* Raport prac: [link](#raport-prac)

## Opis projektu

Aplikacja, która małymi kroczkami wspomaga codzienną pracę nad sobą, pomagając wyrobić w sobie przydatne nawyki oraz wygasić te niechciane. Codziennie o określonej, wcześniej w aplikacji, porze przychodzi powiadomienie, gdzie należy odpowiedzieć czy udało się zaliczyć daną czynność/zadanie (każde z osobna). Po wszystkich odpowiedziach wyświetlane jest podsumowanie, które prezentowane będzie w postaci licznika passy, % wykonanych czynności w danym miesiącu oraz kolorowych miesięcznych wykresów. Użytkownik aplikacji może dodawać własne, edytować, usuwać oraz przypisywać sugerowane, przez autorów aplikacji, zadania. Z aplikacji można skorzystać po zalogowaniu (przy użyciu kont społecznościowych oraz tradycyjnie) ale także w pewnym zakresie w trybie offline. 

Typy czynności możliwe do dodania i śledzenia znajdują się poniżej.

* "Yes/No" np. dzień bez alkoholu, gdzie odpowiedzią jest wartość logiczna
* Z odpowiedzią np. 30min nauki dziennie, gdzie należy podać wartość liczbową co oznacza, że czynność można wykonać cząstkowo
* Informacja np. jakiś ładny cytat, pełni rolę przypominajki
* Mini słownik np. słówka polsko-angielskie dotyczące ekonomii

## Organizacja pracy

### Zarządzanie projektem

**Link do [systemu zarządzania projektem (ZenHub)](https://app.zenhub.com/workspace/o/uek-pro/bai-project/) lub/i listy issuesów oraz pull requestów razem wziętych, czyli [zbioru zadań](https://github.com/uek-pro/bai-project/issues?page=1&q=-label%3Aduplicate&utf8=%E2%9C%93).**

### Gałęzie projektu

* **[master](https://github.com/uek-pro/bai-project/tree/master)** - Główna gałąź aplikacji. **Commity dodawane wyłącznie poprzez pull request** (wytłumaczone poniżej).
* **[gh-pages](https://github.com/uek-pro/bai-project/tree/gh-pages)** - Gałąź z dokumentacją. Commity dodawane dowolnie.
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
git checkout master
git pull origin master
```

## Prototyp aplikacji

Prototyp aplikacji dostępny jest pod adresem [https://8h4b8u.axshare.com](https://8h4b8u.axshare.com)

### Struktura aplikacji

![Struktura aplikacji](assets\img\application-usage-schema.png)

## Skład zespołu projektowego

<table class="authors" style="text-align:center">
    <tr>
      <td>
        <a href="https://github.com/adamusdaniel">
            <img width="120" height="120"
        src="https://avatars1.githubusercontent.com/u/23094478?v=4">
        </a>
        <p>
            Daniel<br>
            185757<br>
            KrDUIs1012
        </p>
      </td>
      <td>
        <a href="https://github.com/danbraj">
            <img width="120" height="120"
        src="https://avatars3.githubusercontent.com/u/19363013?v=4">
        </a>
        <p>
            Daniel <span>(kierownik)</span><br>
            185777<br>
            KrDUIs1011
        </p>
      </td>
      <td>
        <a href="https://github.com/insomnia1337">
            <img width="120" height="120"
        src="https://avatars1.githubusercontent.com/u/23103157?v=4">
        </a>
        <p>
            Mateusz<br>
            185868<br>
            KrDUIs1011
        </p>
      </td>
      <td>
        <a href="https://github.com/EmSiii">
            <img width="120" height="120"
        src="https://avatars1.githubusercontent.com/u/22874596?v=4">
        </a>
        <p>
            Michał<br>
            186049<br>
            KrDUIs1011
        </p>
      </td>
    </tr>
</table>

## Raport prac

| Zadanie | Daniel | Daniel (k) | Mateusz | Michał |
| ---------------- | -: | -: | -: | -: |
| Stworzenie szablonu projektowego | 1 | 1 |  |  | 
| Stworzenie prototypu aplikacji | 16 | 2 | 0.5 | 2 | 
| Konfiguracja środowiska deweloperskiego |  | 1 | 12 |  | 
| Konfiguracja firebase'a |  | 1 | 1 |  | 
| Przygotowanie formularzy dla logowania i rejestracji |  |  | 1 | 1 | 
| Logowanie przez portale społecznościowe |  | 2 |  |  | 
| Logowanie tradycyjne za pomocą email i hasła |  |  | 5 | 2 | 
| Walidacja formularzy |  |  | 3 | 1,5 | 
| Wybór nazwy aplikacji | 1 |  | 0.5 | 1 | 
| Przygotowywanie zadań do wykonania zespołowi |  | 1 |  |  | 
| Opracowanie struktury bazy danych oraz struktury pojedynczego zwyczaju |  | 2 |  |  | 
| Stworzenie grafik aplikacji | 10 |  |  | 10 | 
| Obróbka grafik oraz dodanie ikon i splashscreena do aplikacji |  | 1,5 |  |  | 
| Przygotowanie szablonu dokumentacji |  | 0,5 |  | 0,5 | 
| Przygotowanie dokumentacji |  | 3 |  | 2 | 
| Przygotowanie szkieletu (UI) aplikacji |  | 2 | 1 | 1 | 
| Strona ustawień aplikacji |  | 0,5 |  | 2 | 
| Przygotowanie wykresów |  | 5 |  | 3 | 
| Funkcjonalność dodawania nowego zwyczaju |  | 3 |  |  | 
| Przygotowanie listy sugerowanych zwyczajów |  | 1 |  | 2,5 | 
| Funkcjonalność wyświetlania sugerowanych zwyczajów |  | 1,5 |  |  | 
| Stworzenie i oprogramowanie podstrony dodawania nowego zwyczaju |  | 2,5 |  |  | 
| Dodanie funkcjonalności wywołania realizacji zadań o określonej porze |  | 3 |  |  | 
| Dodanie funkcjonalności realizacji zadań |  | 2 |  |  | 
| Stworzenie i oprogramowanie podstrony szczegółów wybranego zwyczaju |  | 2 |  |  | 
| Dodanie do aplikacji obsługi zadań typu mini-słownik |  | 3 | 2,5 | 2 | 
| Przygotowanie estetycznych przycisków social mediów |  |  | 1 |  | 
| Funkcjonalność usuwania zwyczaju |  |  | 3 |  | 
| Stylowanie aplikacji logowanie / rejestracja, globalne zmiany UI |  |  | 3 |  | 
| Filtrowanie nawyków |  |  | 1,5 |  | 
| **Podsumowanie** |**28**|**40,5**|**34**|**30,5**|
| **Udział** |**21,05%**|**30,45%**|**25,56%**|**22,93%**|

![Practice Control](https://raw.githubusercontent.com/uek-pro/bai-project/master/src/img/logo.svg?sanitize=true)