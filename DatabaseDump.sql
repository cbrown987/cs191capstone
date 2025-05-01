--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: saved_menus; Type: TABLE; Schema: public; Owner: cap_admin
--

CREATE TABLE public.saved_menus (
    id uuid NOT NULL,
    saved_menu jsonb,
    "timestamp" timestamp without time zone,
    name character varying(255)
);


ALTER TABLE public.saved_menus OWNER TO cap_admin;

--
-- Name: user_saved_menus; Type: TABLE; Schema: public; Owner: cap_admin
--

CREATE TABLE public.user_saved_menus (
    user_id integer NOT NULL,
    menu_id uuid NOT NULL
);


ALTER TABLE public.user_saved_menus OWNER TO cap_admin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: cap_admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    about text,
    saved_recipes jsonb,
    email character varying(255) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO cap_admin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: cap_admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO cap_admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cap_admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: cap_admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: saved_menus; Type: TABLE DATA; Schema: public; Owner: cap_admin
--

COPY public.saved_menus (id, saved_menu, "timestamp", name) FROM stdin;
ce718170-86f1-4e96-91ac-3187b4f58fa9	"{\\"food\\":[{\\"name\\":\\"Spicy Arrabiata Penne\\",\\"id\\":\\"52771\\",\\"category\\":\\"Vegetarian\\",\\"description\\":\\"A simple spicy pasta dish.\\"},{\\"name\\":\\"Chicken Fajita Mac and Cheese\\",\\"id\\":\\"52818\\",\\"category\\":\\"Chicken\\",\\"description\\":\\"Creamy mac and cheese with a fajita twist.\\"}],\\"drinks\\":[{\\"name\\":\\"Margarita\\",\\"id\\":\\"11007\\",\\"category\\":\\"Ordinary Drink\\",\\"description\\":\\"Classic tequila cocktail.\\"},{\\"name\\":\\"Old Fashioned\\",\\"id\\":\\"11001\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"A timeless whiskey cocktail.\\"}]}"	\N	\N
c5dd5a46-72c6-4649-b172-cd3e91ef5477	"{\\"food\\":[{\\"name\\":\\"Sledz w Oleju (Polish Herrings)\\",\\"id\\":\\"53023\\",\\"category\\":\\"Appetizer\\",\\"description\\":\\"Marinated herring in oil with a side of onion and lemon\\"},{\\"name\\":\\"Irish Stew\\",\\"id\\":\\"52781\\",\\"category\\":\\"Entree\\",\\"description\\":\\"Hearty lamb and vegetable stew with whole wheat\\"},{\\"name\\":\\"Chicken Couscous\\",\\"id\\":\\"52850\\",\\"category\\":\\"Entree\\",\\"description\\":\\"Spicy chicken and vegetable couscous with apricots and chickpeas\\"},{\\"name\\":\\"Battenberg Cake\\",\\"id\\":\\"52914\\",\\"category\\":\\"Dessert\\",\\"description\\":\\"Traditional British cake made with almond sponge and marzipan\\"},{\\"name\\":\\"Apam balik\\",\\"id\\":\\"53049\\",\\"category\\":\\"Dessert\\",\\"description\\":\\"Malaysian-style pancake with butter, cream corn, and peanuts\\"}],\\"drinks\\":[{\\"name\\":\\"Broadside\\",\\"id\\":\\"178311\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"Rum-based cocktail with scotch, bitters, and wormwood\\"},{\\"name\\":\\"Flying Scotchman\\",\\"id\\":\\"11369\\",\\"category\\":\\"Ordinary Drink\\",\\"description\\":\\"Scotch-based cocktail with sweet vermouth and bitters\\"},{\\"name\\":\\"Dubonnet Cocktail\\",\\"id\\":\\"11326\\",\\"category\\":\\"Ordinary Drink\\",\\"description\\":\\"Gin-based cocktail with Dubonnet and bitters\\"},{\\"name\\":\\"Spice 75\\",\\"id\\":\\"178322\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"Rum-based cocktail with spiced syrup, lime juice, and champagne\\"},{\\"name\\":\\"Atlantic Sun\\",\\"id\\":\\"13423\\",\\"category\\":\\"Ordinary Drink\\",\\"description\\":\\"Vodka-based cocktail with Southern Comfort and passion fruit syrup\\"}]}"	\N	\N
d3abf577-8c47-4aa0-a25c-a863b7162935	"{\\"food\\":[{\\"name\\":\\"Spicy Arrabiata Penne\\",\\"id\\":\\"52771\\",\\"category\\":\\"Vegetarian\\",\\"description\\":\\"A simple spicy pasta dish.\\"},{\\"name\\":\\"Chicken Fajita Mac and Cheese\\",\\"id\\":\\"52818\\",\\"category\\":\\"Chicken\\",\\"description\\":\\"Creamy mac and cheese with a fajita twist.\\"}],\\"drinks\\":[{\\"name\\":\\"Margarita\\",\\"id\\":\\"11007\\",\\"category\\":\\"Ordinary Drink\\",\\"description\\":\\"Classic tequila cocktail.\\"},{\\"name\\":\\"Old Fashioned\\",\\"id\\":\\"11001\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"A timeless whiskey cocktail.\\"}]}"	2025-04-27 14:16:22.152956	\N
f76e4d72-9a83-4342-8b9d-a409c657d003	"{\\"food\\":[{\\"name\\":\\"Kentucky Fried Chicken\\",\\"id\\":\\"52813\\",\\"category\\":\\"Main Course\\",\\"description\\":\\"Crispy fried chicken with a side of mashed potatoes and vegetables\\"},{\\"name\\":\\"Salmon Avocado Salad\\",\\"id\\":\\"52960\\",\\"category\\":\\"Salads\\",\\"description\\":\\"Mixed greens with smoked salmon, avocado, cucumber, and a lemon-tahini dressing\\"},{\\"name\\":\\"Grilled eggplant with coconut milk\\",\\"id\\":\\"53034\\",\\"category\\":\\"Vegetarian\\",\\"description\\":\\"Grilled eggplant in a creamy coconut milk sauce with a sprinkle of green onions\\"},{\\"name\\":\\"Mustard champ\\",\\"id\\":\\"53038\\",\\"category\\":\\"Side Dish\\",\\"description\\":\\"Mashed potatoes with wholegrain mustard and chopped spring onions\\"},{\\"name\\":\\"Ribollita\\",\\"id\\":\\"52811\\",\\"category\\":\\"Soups\\",\\"description\\":\\"Hearty Italian soup made with vegetables, beans, and bread\\"}],\\"drinks\\":[{\\"name\\":\\"Spanish chocolate\\",\\"id\\":\\"12750\\",\\"category\\":\\"Hot Chocolate\\",\\"description\\":\\"Rich and creamy hot chocolate made with milk, chocolate, and cinnamon\\"},{\\"name\\":\\"Wine Cooler\\",\\"id\\":\\"13056\\",\\"category\\":\\"Wine\\",\\"description\\":\\"Refreshing drink made with red wine and lemon-lime soda\\"},{\\"name\\":\\"Orange Oasis\\",\\"id\\":\\"11870\\",\\"category\\":\\"Cocktails\\",\\"description\\":\\"Fruity and bubbly cocktail made with brandy, gin, orange juice, and ginger ale\\"},{\\"name\\":\\"Rum Milk Punch\\",\\"id\\":\\"12087\\",\\"category\\":\\"Cocktails\\",\\"description\\":\\"Creamy and sweet cocktail made with rum, milk, powdered sugar, and a sprinkle of nutmeg\\"},{\\"name\\":\\"Zambeer\\",\\"id\\":\\"15933\\",\\"category\\":\\"Beer\\",\\"description\\":\\"Unique beer cocktail made with sambuca and root beer\\"}],\\"timestamp\\":null}"	2025-04-28 03:28:58.703338	\N
9fa1758b-50a1-43e1-b9d5-748b34691949	"{\\"food\\":[{\\"name\\":\\"Steak and Kidney Pie\\",\\"id\\":\\"52881\\",\\"category\\":\\"Entrees\\",\\"description\\":\\"A classic British dish made with beef, kidney, and puff pastry\\"},{\\"name\\":\\"Massaman Beef curry\\",\\"id\\":\\"52827\\",\\"category\\":\\"Entrees\\",\\"description\\":\\"A Thai-inspired beef curry made with peanuts, coconut milk, and spices\\"},{\\"name\\":\\"Salmon Avocado Salad\\",\\"id\\":\\"52960\\",\\"category\\":\\"Salads\\",\\"description\\":\\"A fresh and healthy salad made with salmon, avocado, and mixed greens\\"},{\\"name\\":\\"Budino Di Ricotta\\",\\"id\\":\\"52961\\",\\"category\\":\\"Desserts\\",\\"description\\":\\"An Italian-style ricotta cake made with eggs, sugar, and cinnamon\\"},{\\"name\\":\\"Tuna and Egg Briks\\",\\"id\\":\\"52975\\",\\"category\\":\\"Appetizers\\",\\"description\\":\\"A Tunisian-style snack made with tuna, eggs, and filo pastry\\"}],\\"drinks\\":[{\\"name\\":\\"The Jimmy Conway\\",\\"id\\":\\"17826\\",\\"category\\":\\"Cocktails\\",\\"description\\":\\"A whiskey-based cocktail made with Irish whiskey, amaretto, and cranberry juice\\"},{\\"name\\":\\"Amaretto Sunset\\",\\"id\\":\\"17168\\",\\"category\\":\\"Cocktails\\",\\"description\\":\\"A sweet and sour cocktail made with amaretto, triple sec, and pineapple juice\\"},{\\"name\\":\\"Bounty Hunter\\",\\"id\\":\\"178331\\",\\"category\\":\\"Cocktails\\",\\"description\\":\\"A tropical cocktail made with rum, coconut liqueur, and pineapple juice\\"},{\\"name\\":\\"Pornstar Martini\\",\\"id\\":\\"178357\\",\\"category\\":\\"Cocktails\\",\\"description\\":\\"A fruity and bubbly cocktail made with vodka, passoa, and passion fruit juice\\"},{\\"name\\":\\"Royal Flush\\",\\"id\\":\\"15082\\",\\"category\\":\\"Shots\\",\\"description\\":\\"A sweet and fruity shot made with Crown Royal, peach schnapps, and cranberry juice\\"}],\\"timestamp\\":null}"	2025-04-28 03:39:51.361867	\N
85708a53-3dcc-4762-a4f0-8288a50d1009	"{\\"food\\":[{\\"name\\":\\"Kafteji\\",\\"id\\":\\"52971\\",\\"category\\":\\"Main Course\\",\\"description\\":\\"Fried vegetables with potatoes, peppers, onions, and pumpkin.\\"},{\\"name\\":\\"Ratatouille\\",\\"id\\":\\"52908\\",\\"category\\":\\"Main Course\\",\\"description\\":\\"Vegetable stew from Provence, with eggplant, zucchini, bell peppers, and tomatoes.\\"},{\\"name\\":\\"Boulangère Potatoes\\",\\"id\\":\\"52914\\",\\"category\\":\\"Side Dish\\",\\"description\\":\\"Potatoes and onions baked in the oven with thyme and olive oil.\\"},{\\"name\\":\\"Chicken Parmentier\\",\\"id\\":\\"52879\\",\\"category\\":\\"Main Course\\",\\"description\\":\\"Chicken, potatoes, and vegetables in a creamy tomato sauce.\\"},{\\"name\\":\\"Tahini Lentils\\",\\"id\\":\\"52869\\",\\"category\\":\\"Main Course\\",\\"description\\":\\"Lentils, tahini, garlic, and lemon juice, served with rice or bread.\\"}],\\"drinks\\":[{\\"name\\":\\"Salty Dog\\",\\"id\\":\\"12107\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"Grapefruit juice and gin, served in a highball glass with salt.\\"},{\\"name\\":\\"Aviation\\",\\"id\\":\\"17180\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"Gin, maraschino liqueur, and lemon juice, served in a cocktail glass.\\"},{\\"name\\":\\"Amaretto Stone Sour Alternative\\",\\"id\\":\\"16100\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"Amaretto, tequila, and sour mix, served in a highball glass with a splash of orange juice.\\"},{\\"name\\":\\"Brandy Sour\\",\\"id\\":\\"11170\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"Brandy, lemon juice, and powdered sugar, served in a whiskey sour glass.\\"},{\\"name\\":\\"Holloween Punch\\",\\"id\\":\\"12954\\",\\"category\\":\\"Punch\\",\\"description\\":\\"Grape juice, carbonated soft drink, and sherbet, served in a punch bowl.\\"}],\\"timestamp\\":null}"	2025-04-29 02:26:22.442484	\N
d1587102-757e-4106-8f02-e6a2adfd74ac	"{\\"food\\":[{\\"name\\":\\"Oxtail with broad beans\\",\\"id\\":\\"52943\\",\\"category\\":\\"Entrees\\",\\"description\\":\\"A Jamaican dish made with oxtail, broad beans, and a blend of spices.\\"},{\\"name\\":\\"Ribollita\\",\\"id\\":\\"52811\\",\\"category\\":\\"Vegetarian\\",\\"description\\":\\"A hearty Italian soup made with vegetables, bread, and cannellini beans.\\"},{\\"name\\":\\"Budino Di Ricotta\\",\\"id\\":\\"52961\\",\\"category\\":\\"Desserts\\",\\"description\\":\\"An Italian dessert made with ricotta, eggs, and sugar, baked in a cake tin.\\"},{\\"name\\":\\"Stamppot\\",\\"id\\":\\"52980\\",\\"category\\":\\"Entrees\\",\\"description\\":\\"A traditional Dutch dish made with boiled potatoes, kale, and sausage.\\"},{\\"name\\":\\"Fettucine alfredo\\",\\"id\\":\\"52835\\",\\"category\\":\\"Pasta\\",\\"description\\":\\"A classic Italian pasta dish made with fettucine, butter, and parmesan cheese.\\"}],\\"drinks\\":[{\\"name\\":\\"Gin Lemon\\",\\"id\\":\\"178366\\",\\"category\\":\\"Cocktails\\",\\"description\\":\\"A refreshing drink made with gin and lemonade.\\"},{\\"name\\":\\"Thriller\\",\\"id\\":\\"12388\\",\\"category\\":\\"Cocktails\\",\\"description\\":\\"A cocktail made with scotch, wine, and orange juice.\\"},{\\"name\\":\\"Kill the cold Smoothie\\",\\"id\\":\\"12720\\",\\"category\\":\\"Smoothies\\",\\"description\\":\\"A non-alcoholic smoothie made with ginger, lemon, and water.\\"},{\\"name\\":\\"Grape lemon pineapple Smoothie\\",\\"id\\":\\"12712\\",\\"category\\":\\"Smoothies\\",\\"description\\":\\"A fruity smoothie made with grapes, lemon, and pineapple.\\"}],\\"timestamp\\":null,\\"name\\":null}"	2025-04-29 19:44:35.135876	My cooky menu
634886d7-9883-44d0-bef5-b947bcc7c888	"{\\"food\\":[{\\"name\\":\\"Stamppot\\",\\"id\\":\\"52980\\",\\"category\\":\\"Pork\\",\\"description\\":\\"A Dutch dish made with potatoes, kale, sausage, and mustard.\\"},{\\"name\\":\\"Full English Breakfast\\",\\"id\\":\\"52896\\",\\"category\\":\\"Breakfast\\",\\"description\\":\\"A traditional English breakfast dish made with bacon, eggs, sausages, grilled tomatoes, mushrooms, and toast.\\"},{\\"name\\":\\"Stovetop Eggplant With Harissa, Chickpeas, and Cumin Yogurt\\",\\"id\\":\\"52817\\",\\"category\\":\\"Vegetarian\\",\\"description\\":\\"A flavorful and spicy eggplant dish made with harissa, chickpeas, and cumin yogurt.\\"},{\\"name\\":\\"Beef Wellington\\",\\"id\\":\\"52803\\",\\"category\\":\\"Beef\\",\\"description\\":\\"A classic dish made with beef fillet, mushrooms, and puff pastry.\\"},{\\"name\\":\\"Eccles Cakes\\",\\"id\\":\\"52888\\",\\"category\\":\\"Dessert\\",\\"description\\":\\"A traditional English dessert made with flaky pastry, currants, and often served with cheese.\\"}],\\"drinks\\":[{\\"name\\":\\"Lemon Drop\\",\\"id\\":\\"14366\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"A classic cocktail made with vodka, cointreau, and lemon juice.\\"},{\\"name\\":\\"Tipperary\\",\\"id\\":\\"17828\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"A classic cocktail made with Irish whiskey, sweet vermouth, and green Chartreuse.\\"},{\\"name\\":\\"New York Lemonade\\",\\"id\\":\\"13204\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"A refreshing cocktail made with Absolut Citron, Grand Marnier, and lemon juice.\\"},{\\"name\\":\\"Kir Royale\\",\\"id\\":\\"13837\\",\\"category\\":\\"Ordinary Drink\\",\\"description\\":\\"A classic French cocktail made with Creme de Cassis and champagne.\\"},{\\"name\\":\\"Ice Pick\\",\\"id\\":\\"13539\\",\\"category\\":\\"Ordinary Drink\\",\\"description\\":\\"A simple and refreshing drink made with vodka and iced tea.\\"}],\\"timestamp\\":null,\\"name\\":null}"	2025-05-01 16:50:56.201424	My very fun menu
4122b1c9-864b-4413-bce8-f6c569bbfd9b	"{\\"food\\":[{\\"name\\":\\"Stamppot\\",\\"id\\":\\"52980\\",\\"category\\":\\"Pork\\",\\"description\\":\\"A Dutch dish made with potatoes, kale, sausage, and mustard.\\"},{\\"name\\":\\"Full English Breakfast\\",\\"id\\":\\"52896\\",\\"category\\":\\"Breakfast\\",\\"description\\":\\"A traditional English breakfast dish made with bacon, eggs, sausages, grilled tomatoes, mushrooms, and toast.\\"},{\\"name\\":\\"Stovetop Eggplant With Harissa, Chickpeas, and Cumin Yogurt\\",\\"id\\":\\"52817\\",\\"category\\":\\"Vegetarian\\",\\"description\\":\\"A flavorful and spicy eggplant dish made with harissa, chickpeas, and cumin yogurt.\\"},{\\"name\\":\\"Beef Wellington\\",\\"id\\":\\"52803\\",\\"category\\":\\"Beef\\",\\"description\\":\\"A classic dish made with beef fillet, mushrooms, and puff pastry.\\"},{\\"name\\":\\"Eccles Cakes\\",\\"id\\":\\"52888\\",\\"category\\":\\"Dessert\\",\\"description\\":\\"A traditional English dessert made with flaky pastry, currants, and often served with cheese.\\"}],\\"drinks\\":[{\\"name\\":\\"Lemon Drop\\",\\"id\\":\\"14366\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"A classic cocktail made with vodka, cointreau, and lemon juice.\\"},{\\"name\\":\\"Tipperary\\",\\"id\\":\\"17828\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"A classic cocktail made with Irish whiskey, sweet vermouth, and green Chartreuse.\\"},{\\"name\\":\\"New York Lemonade\\",\\"id\\":\\"13204\\",\\"category\\":\\"Cocktail\\",\\"description\\":\\"A refreshing cocktail made with Absolut Citron, Grand Marnier, and lemon juice.\\"},{\\"name\\":\\"Kir Royale\\",\\"id\\":\\"13837\\",\\"category\\":\\"Ordinary Drink\\",\\"description\\":\\"A classic French cocktail made with Creme de Cassis and champagne.\\"},{\\"name\\":\\"Ice Pick\\",\\"id\\":\\"13539\\",\\"category\\":\\"Ordinary Drink\\",\\"description\\":\\"A simple and refreshing drink made with vodka and iced tea.\\"}],\\"timestamp\\":null,\\"name\\":null}"	2025-05-01 16:51:00.187031	My very fun menu
\.


--
-- Data for Name: user_saved_menus; Type: TABLE DATA; Schema: public; Owner: cap_admin
--

COPY public.user_saved_menus (user_id, menu_id) FROM stdin;
7	ce718170-86f1-4e96-91ac-3187b4f58fa9
6	c5dd5a46-72c6-4649-b172-cd3e91ef5477
1	d3abf577-8c47-4aa0-a25c-a863b7162935
6	f76e4d72-9a83-4342-8b9d-a409c657d003
6	9fa1758b-50a1-43e1-b9d5-748b34691949
6	85708a53-3dcc-4762-a4f0-8288a50d1009
6	d1587102-757e-4106-8f02-e6a2adfd74ac
6	634886d7-9883-44d0-bef5-b947bcc7c888
6	4122b1c9-864b-4413-bce8-f6c569bbfd9b
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: cap_admin
--

COPY public.users (id, name, username, about, saved_recipes, email, password) FROM stdin;
1	test_user	testbruhun	Just a guy who likes food.	[{"recipe1": "52764"}, {"recipe2": "52808"}, {"recipe3": "53037"}]	bruh.bruh@bruh.com	bruh1234
4	test_user2	testbruh	Just a guy who likes food alot.	[{"recipe1": "52764"}, {"recipe2": "52808"}, {"recipe3": "53037"}]	bruh.bruhbruh@bruh.com	bruh1234
5	test_user3	test_user	Just a guy who likes food alot more.	[{"recipe1": "52764"}, {"recipe2": "52808"}, {"recipe3": "53037"}, {}, {"Chocolate Caramel Crispy": "M52966"}, {"Planter’s Punch": "M178368"}, {"White Russian": "M12528"}, {"Aloha Fruit punch": "C12862"}, {"Flying Dutchman": "M11368"}, {"501 Blue": "M17105"}, {"Popped cherry": "C13072"}, {"Apple Highball": "C178353"}, {"Turkey Meatloaf": "M52845"}, {"Rogaliki (Polish Croissant Cookies)": "M53024"}]	bruh.bruhbru@bruh.com	bruh1234
7	Hobbes 1	Hobbes2	\N	[]	Hello@aa	123123
6	Hobbes Christan	Hobbes1		[{"Pear Tarte Tatin": "M52916"}]	H@A.com	123123
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cap_admin
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: saved_menus saved_menus_pkey; Type: CONSTRAINT; Schema: public; Owner: cap_admin
--

ALTER TABLE ONLY public.saved_menus
    ADD CONSTRAINT saved_menus_pkey PRIMARY KEY (id);


--
-- Name: user_saved_menus user_saved_menus_pkey; Type: CONSTRAINT; Schema: public; Owner: cap_admin
--

ALTER TABLE ONLY public.user_saved_menus
    ADD CONSTRAINT user_saved_menus_pkey PRIMARY KEY (user_id, menu_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: cap_admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: cap_admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: cap_admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_user_saved_menus_menu_id; Type: INDEX; Schema: public; Owner: cap_admin
--

CREATE INDEX idx_user_saved_menus_menu_id ON public.user_saved_menus USING btree (menu_id);


--
-- Name: idx_user_saved_menus_user_id; Type: INDEX; Schema: public; Owner: cap_admin
--

CREATE INDEX idx_user_saved_menus_user_id ON public.user_saved_menus USING btree (user_id);


--
-- Name: user_saved_menus user_saved_menus_menu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cap_admin
--

ALTER TABLE ONLY public.user_saved_menus
    ADD CONSTRAINT user_saved_menus_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.saved_menus(id) ON DELETE CASCADE;


--
-- Name: user_saved_menus user_saved_menus_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cap_admin
--

ALTER TABLE ONLY public.user_saved_menus
    ADD CONSTRAINT user_saved_menus_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

