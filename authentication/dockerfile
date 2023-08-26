FROM python:alpine
WORKDIR /python-api
ENV PYTHONDONTWRITEBYTECODE 1
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . .
CMD [ "python3","-m","flask","run","--host=0.0.0.0" ]