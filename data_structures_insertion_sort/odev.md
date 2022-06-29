# Insertion Sort Project
## Project 1

1) [22,27,16,2,18,6] -> Insertion Sort
- [22|27,16,2,18,6] = 22 başta kalır
- [22,27|16,2,18,6] = 22, 27 den küçüktür yine aynı kalır
- [16,22,27|2,18,6] = 27, 16 danbüyüktür sağa kayar, sonra 22 de 16 dan büyüktür sağa kayar
- [2,16,22,27|18,6] = 27, 22 ve 16 sırasıyla sağa kayar çünkü hepsi 2den büyüktür
- [2,16,18,22,27|6] = 27 ve 22 sırasıyla 18 den büyüktürler ve sağa kayarlar 
- [2,6,16,18,22,27] = 27, 22, 18 ve 16 sırasıyla 6 dan büyüktürler ve sağa kayarlar 

2) O(n^2) 

3) Time Complexity: Average case: Aradığımız sayının ortada olması,Worst case: Aradığımız sayının sonda olması, Best case: Aradığımız sayının dizinin en başında olması.

4) Dizi sıralandıktan sonra 18 sayısı average case kapsamına girer çünkü ne baştadır ne de sondadır, ortalarda bulunur

[7,3,5,8,2,9,4,15,6]
- 1.adım -> [7|3,5,8,2,9,4,15,6] = 7 başta kalır
- 2.adım -> [3,7|5,8,2,9,4,15,6] = 7, 3 ten büyüktür ve sağa kayar
- 3.adım -> [3,5,7|8,2,9,4,15,6] = 7, 5 ten büyüktür ve sağa kayar, 3, 5 ten küçüktür yerinde kalır
- 4.adım -> [3,5,7,8|2,9,4,15,6] = 7, 8 den küçüktür ve yerinde kalır










