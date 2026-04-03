#!/bin/bash
echo "=== PURIFICATION CSS ==="

# Chemins
CSS_SOURCE="../../css/style.css"
CSS_PURGED="../../css/style.purged.css"
CSS_BACKUP="../../css/style.css.backup.$(date +%Y%m%d_%H%M%S)"
TEMP_CLASSES="/tmp/css_classes_$(date +%s).txt"

# Backup du CSS original
echo "1. Backup du CSS original..."
cp "$CSS_SOURCE" "$CSS_BACKUP"
echo "   Backup créé: $CSS_BACKUP"

# Extraire TOUTES les classes de tous les templates
echo "2. Extraction des classes depuis les templates..."
find resources/views -name "*.antlers.html" -exec cat {} \; | \
  grep -o 'class="[^"]*"' | \
  sed 's/class="//g; s/"//g' | \
  tr ' ' '\n' | \
  sort -u > "$TEMP_CLASSES"

echo "   Nombre de classes uniques trouvées: $(wc -l < "$TEMP_CLASSES")"

# Extraire aussi les IDs (au cas où)
find resources/views -name "*.antlers.html" -exec cat {} \; | \
  grep -o 'id="[^"]*"' | \
  sed 's/id="//g; s/"//g' | \
  sort -u >> "$TEMP_CLASSES"

# Créer le CSS purgé
echo "3. Création du CSS purgé..."

# D'abord, garder les imports et commentaires globaux
grep -E '^\s*@import|^\s*/\*|^\s*\*|^\*/' "$CSS_SOURCE" > "$CSS_PURGED"
echo "" >> "$CSS_PURGED"

# Ajouter une section pour les règles gardées
echo "/* === RÈGLES PURGÉES === */" >> "$CSS_PURGED"
echo "" >> "$CSS_PURGED"

# Pour chaque classe, chercher les règles CSS correspondantes
while read -r class; do
    if [ -n "$class" ] && [ "$class" != " " ]; then
        # Chercher la classe dans le CSS
        grep -E "\.${class}([^a-zA-Z0-9_-]|$)|#${class}([^a-zA-Z0-9_-]|$)" "$CSS_SOURCE" >> "$CSS_PURGED" 2>/dev/null
    fi
done < "$TEMP_CLASSES"

# Ajouter les sélecteurs généraux (html, body, *, etc.)
echo "" >> "$CSS_PURGED"
echo "/* === SÉLECTEURS GÉNÉRAUX === */" >> "$CSS_PURGED"
echo "" >> "$CSS_PURGED"
grep -E '^\s*(html|body|\*|\[|:root|::)' "$CSS_SOURCE" >> "$CSS_PURGED"

# Ajouter les media queries
echo "" >> "$CSS_PURGED"
echo "/* === MEDIA QUERIES === */" >> "$CSS_PURGED"
echo "" >> "$CSS_PURGED"
grep -E '^\s*@media' "$CSS_SOURCE" | while read -r media_line; do
    echo "$media_line" >> "$CSS_PURGED"
    # Trouver le bloc correspondant
    grep -A 50 "^$media_line$" "$CSS_SOURCE" | \
      awk '/^\s*}\s*$/ {print; exit} {print}' >> "$CSS_PURGED"
done

# Nettoyage et fin
rm -f "$TEMP_CLASSES"

# Statistiques
ORIG_SIZE=$(stat -c%s "$CSS_SOURCE")
PURGED_SIZE=$(stat -c%s "$CSS_PURGED")
REDUCTION=$((100 - PURGED_SIZE * 100 / ORIG_SIZE))

echo ""
echo "=== RÉSULTATS ==="
echo "Original:  $ORIG_SIZE bytes"
echo "Purgé:     $PURGED_SIZE bytes"
echo "Réduction: $REDUCTION%"
echo ""
echo "Fichier créé: $CSS_PURGED"
echo "Backup:       $CSS_BACKUP"
echo ""
echo "Pour tester:"
echo "1. mv $CSS_PURGED $CSS_SOURCE"
echo "2. Modifie ?=v6 en ?=v7 dans default.antlers.html et layout.antlers.html"
echo "3. Teste ton site!"
