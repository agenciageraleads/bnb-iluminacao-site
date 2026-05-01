BEGIN;

-- Update main product
UPDATE products 
SET 
  name = 'Braço Curvo p/ Luminária Pública',
  model = 'BB-NEX-BCLXX',
  description = '{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Desenvolvido para garantir máxima eficiência e durabilidade em sistemas de iluminação viária, nosso braço metálico combina resistência estrutural com proteção anticorrosiva de alto nível. Projetado em conformidade com as diretrizes da ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "NBR 5101", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": " e ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "NBR 15129", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": ", ele assegura o suporte ideal para luminárias LED e convencionais, proporcionando a inclinação e o alcance necessários para uma distribuição luminosa uniforme e segura.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}]}}'::jsonb,
  main_image_id = 186,
  lead_time = '10 a 15 dias úteis',
  specs_material = 'Aço Carbono',
  specs_altura = '1m a 4m',
  specs_diametro = '50,8mm (outras medidas sob encomenda)',
  specs_norma = 'NBR 6323 / NBR 14744 / NBR 5101 / NBR 8159 / NBR 15129'
WHERE slug = 'braco-curvo-luminaria-publica';

-- Update child tables
DO $$
DECLARE
  current_id INT;
BEGIN
  SELECT id INTO current_id FROM products WHERE slug = 'braco-curvo-luminaria-publica';

  -- Clear and Insert gallery
  DELETE FROM products_gallery WHERE _parent_id = current_id;
  INSERT INTO products_gallery (id, _order, _parent_id, image_id) VALUES ('69eff0ef4ef22604ae95dcb1', 1, current_id, 185);

  -- Clear and Insert apps
  DELETE FROM products_applications WHERE _parent_id = current_id;
  INSERT INTO products_applications (id, _order, _parent_id, app) VALUES 
  ('69ee9146d2c9f8cb430a69c0', 1, current_id, 'Vias Públicas'),
  ('69efec204ef22604ae95dcae', 2, current_id, 'Condomínios'),
  ('69efec284ef22604ae95dcaf', 3, current_id, 'Estacionamentos'),
  ('69efec334ef22604ae95dcb0', 4, current_id, 'Áreas Industriais');
END $$;

COMMIT;
