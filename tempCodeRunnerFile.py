for y in range(20, 24):
    for q in range(1, 5):
                url = f'https://duong-len-dinh-olympia.fandom.com/vi/wiki/Olympia_{y}/Quý_{q}'
                response = requests.get(url)
                html = response.content
                soup = BeautifulSoup(html, 'html.parser')
                table = soup.find_all('table', class_ = 'sectiontable')[1]
                tr_list = table.select('tr')
                questions_object = {}
                answers_object = {}
                i = 1
                for tr in tr_list:
                    td_list = tr.select('td')
                    if len(td_list) == 2:
                        questions_object[i] = td_list[0].get_text().strip()
                        answers_object[i] = td_list[1].get_text().strip()
                        i += 1
                file_question_path = f'questions/{q}_{y}.json'
                file_answer_path = f'answers/{q}_{y}.json'
                store_json(questions_object, file_question_path)
                store_json(answers_object, file_answer_path)