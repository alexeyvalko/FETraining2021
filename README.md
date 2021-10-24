## RDF description about.html

@prefix rdfa: <http://www.w3.org/ns/rdfa#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix schema: <https://schema.org/> .

<http://sitename.ru/>
   rdfa:usesVocabulary schema: .
_:1 
   rdf:type schema:Person;
   schema:name "Алексей Валько";
   schema:telephone "+37567777-77-77";
   schema:email "valko.alexey@gmail.com".
_:2
   rdf:type schema:PostalAddress;
   schema:streetAddress "пл. Победы 666";
   schema:addressLocality "Гомель";
   schema:addressRegion "Гомельская область";
   schema:postalCode "246000";
   schema:addressCountry "Беларусь".

## RDF description index.html
@prefix rdfa: <http://www.w3.org/ns/rdfa#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix schema: <https://schema.org/> .

<http://sitename.ru/>
   rdfa:usesVocabulary schema: ;
   rdf:type schema:WebPage;
   schema:author "Алексей Валько".

## RDF description table.html
@prefix rdfa: <http://www.w3.org/ns/rdfa#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix schema: <https://schema.org/> .

<http://sitename.ru/>
   rdfa:usesVocabulary schema: ;
   rdf:type schema:WebPage;
   schema:author "Алексей Валько".
