FROM mongo

ENV AUTH yes

ENV MONGODB_ADMIN_USER root
ENV MONGODB_ADMIN_PASS rootPassword

ENV MONGODB_APPLICATION_DATABASE testDb
ENV MONGODB_APPLICATION_USER user
ENV MONGODB_APPLICATION_PASS userPassword

EXPOSE 27017

COPY ./.docker/mongo_scripts /mongo_scripts

RUN chmod +rx /mongo_scripts/*.sh

CMD ["/mongo_scripts/run.sh"]