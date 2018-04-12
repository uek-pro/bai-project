<!-- TOC -->

- [Opis projektu](#opis-projektu)
- [Organizacja pracy](#organizacja-pracy)
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

Gałęzie projektu

* **[master](/uek-pro/bai-project/tree/master)** - Główna gałąź aplikacji. **Commity dodawane wyłącznie poprzez pull request** (wytłumaczone poniżej).
* **[gh-pages](/uek-pro/bai-project/tree/gh-pages)** - Gałąź z dokumentacją. Commity dodawane dowolnie.
* **b-_numer\_issue_** - Gałęzie dodające nowe funkcjonalności lub rozwiązujące problemy o identyfikatorze issue podanym w nazwie gałęzi.
* **_dowolna\_nazwa_** - Dodatkowe gałęzie wspomagające tworzenie aplikacji. Gałęzie można tworzyć dowoli i jest to nawet wskazane.

> **Nie usuwamy branchy**, które zostały już zmergowane. 

Dla mniej wtajemniczonych

```bash
git clone https://github.com/uek-pro/bai-project.git
git checkout -b nazwa_brancha   # Utworzenie brancha o podanej nazwie i przejście do niego
# zmiany.. zmiany..                                       
git add *                       # Dodanie wszystkich zmienionych plików do commita
git commit -m "Commit title"    # Utworzenie commita (pamiętać: tytuł wielką literą i po angielsku)
git push origin nazwa_brancha   # Wysłanie brancha do repozytorium na GitHubie
```

Niezależnie od tego czy problem został rozwiązany czy jest to dopiero początek rozwiązania, pasowałoby utworzyć Pull request. Na [stronie z tworzeniem nowych Pull requestów](https://github.com/uek-pro/bai-project/compare) należy, wybrać w miejscu _compare_ nazwe brancha, nad którym pracowaliśmy, wcisnąć przycisk Create pull request, a następnie uzupełnić pola treścią oraz zatwierdzić. Kolejne wypychane commity automatycznie dodawane są do utworzonego wcześniej pull requesta.

---

Z czasem gdy na branchu master projekt bardziej się posunie niż mamy go u siebie lokalnie, wymagana jest synchronizacja (`git pull origin master`).

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

## Raport prac