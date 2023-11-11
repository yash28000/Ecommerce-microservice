from flask import request,Response
from images import app,db
from images.models import Img
def create_file_name(u_id,name,type_file):
    string = type_file +"_"+ name +"_"+ u_id
    return string
@app.route('/img',methods=["POST","GET"])
def img():
    if request.method == 'POST':
        u_id=request.args.get('id')
        type_file=request.args.get('type')
        name = request.args.get('name')
        pic = request.files['file']
        filename = create_file_name(u_id,name,type_file)
        mimetype=pic.mimetype
        img = Img(img=pic.read(),mimetype=mimetype,name=filename)
        db.session.add(img)
        db.session.commit()
        return 'Img uploaded' ,200
    else:
        u_id=request.args.get('id')
        type_file=request.args.get('type')
        name = request.args.get('name')
        filename = create_file_name(u_id,name,type_file)
        img_data = Img.query.filter_by(name = filename).first()
        return Response(img_data.img,mimetype=img_data.mimetype)